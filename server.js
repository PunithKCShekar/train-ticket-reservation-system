require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder_key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'WebContent')));

// --- API ROUTES ---

app.post('/searchtrainservlet', async (req, res) => {
    const { trainnumber } = req.body;
    const { data: train, error } = await supabase.from('train').select('*').eq('tr_no', trainnumber).single();

    if (error || !train) {
        return res.json({ success: false, message: 'Train Not Found' });
    }
    res.json({ success: true, train });
});

app.post('/booktrains', async (req, res) => {
    const { trainnumber, seats, mailid, amount } = req.body;
    
    const { data: train, error: trainErr } = await supabase.from('train').select('*').eq('tr_no', trainnumber).single();

    if (trainErr || !train) return res.json({ success: false, message: 'Train Not Found' });
    if (train.seats < seats) return res.json({ success: false, message: 'Not enough seats available' });

    // Generate PNR
    const pnr = 'PNR-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    // Deduct seats
    const newSeats = train.seats - seats;
    await supabase.from('train').update({ seats: newSeats }).eq('tr_no', trainnumber);

    // Add History
    const historyRecord = {
        transid: pnr,
        mailid: mailid,
        tr_no: trainnumber,
        date: new Date().toISOString().split('T')[0],
        from_stn: train.from_stn,
        to_stn: train.to_stn,
        seats: seats,
        amount: amount || (train.fare * seats)
    };

    const { error: histErr } = await supabase.from('history').insert([historyRecord]);

    if (histErr) return res.json({ success: false, message: 'Failed to record booking' });

    // Simulate Email Sending
    console.log(`[EMAIL SENT] To: ${mailid} | Subject: Booking Confirmed | PNR: ${pnr}`);

    res.json({ success: true, pnr, history: historyRecord });
});

app.post('/pnrstatus', async (req, res) => {
    const { pnr } = req.body;
    const { data: history, error } = await supabase.from('history').select('*, train(tr_name, fare)').eq('transid', pnr).single();

    if (error || !history) return res.json({ success: false, message: 'Invalid PNR' });
    res.json({ success: true, booking: history });
});

app.post('/cancelticket', async (req, res) => {
    const { pnr } = req.body;
    const { data: history, error: hErr } = await supabase.from('history').select('*').eq('transid', pnr).single();

    if (hErr || !history) return res.json({ success: false, message: 'Invalid PNR' });

    // Refund Seats
    const { data: train } = await supabase.from('train').select('seats').eq('tr_no', history.tr_no).single();
    if (train) {
        await supabase.from('train').update({ seats: train.seats + history.seats }).eq('tr_no', history.tr_no);
    }

    // Delete History
    await supabase.from('history').delete().eq('transid', pnr);

    res.json({ success: true, message: `Ticket ${pnr} cancelled and $${history.amount} refunded.` });
});

app.get('/mybookings/:mailid', async (req, res) => {
    const { data: bookings, error } = await supabase.from('history').select('*').eq('mailid', req.params.mailid);
    if (error) return res.json({ success: false, bookings: [] });
    res.json({ success: true, bookings });
});

// User Auth Operations
app.post('/userlogin', async (req, res) => {
    const { uname, pword } = req.body;
    const { data: customer, error } = await supabase.from('customer').select('*').eq('mailid', uname).eq('pword', pword).single();
    
    if (error || !customer) {
        return res.send(`
            <script>
                alert('Invalid User Credentials!');
                window.location.href = 'index.html';
            </script>
        `);
    }
    
    // Pass user data to frontend via a small script
    res.send(`
        <script>
            sessionStorage.setItem('user', JSON.stringify(${JSON.stringify(customer)}));
            window.location.href = 'UserHome.html';
        </script>
    `);
});

app.post('/userreg', async (req, res) => {
    const { mailid, pword, firstname, lastname, address, phoneno } = req.body;
    
    const user = { mailid, pword, fname: firstname, lname: lastname, addr: address, phno: parseInt(phoneno) };
    const { error } = await supabase.from('customer').insert([user]);

    if (error) {
        if (error.code === '23505' || error.message.includes('duplicate key')) {
            return res.send(`
                <script>
                    alert('Registration Failed: Email already exists. Please login.');
                    window.location.href = 'UserRegister.html';
                </script>
            `);
        }
        return res.send(`<h2>Error: ${error.message}</h2><a href="UserRegister.html">Back</a>`);
    }

    res.send(`
        <script>
            alert('Registration Successful! Please Login.');
            window.location.href = 'index.html';
        </script>
    `);
});

// Admin Operations
app.post('/adminaddtrain', async (req, res) => {
    const { trainno, trainname, fromstation, tostation, available, fare } = req.body;
    const { error } = await supabase.from('train').insert([{
        tr_no: trainno, tr_name: trainname, from_stn: fromstation, to_stn: tostation, seats: available, fare: fare
    }]);

    if (error) return res.send(`<h2>Failed to Add Train: ${error.message}</h2><a href="AdminHome.html">Go Back</a>`);
    res.send(`<h2>Train Added Successfully!</h2><a href="AdminHome.html">Go Back</a>`);
});

app.post('/adminlogin', async (req, res) => {
    const { uname, pword } = req.body;
    const { data: admin, error } = await supabase.from('admin').select('*').eq('mailid', uname).eq('pword', pword).single();
    
    if (error || !admin) return res.send(`<h2>Invalid Admin Credentials!</h2><a href="AdminLogin.html">Try Again</a>`);
    res.redirect('/AdminHome.html');
});

// Admin Train Management APIs
app.get('/api/trains', async (req, res) => {
    const { data: trains, error } = await supabase.from('train').select('*').order('tr_no');
    if (error) return res.json({ success: false, trains: [] });
    res.json({ success: true, trains });
});

app.post('/api/updatetrain', async (req, res) => {
    const { tr_no, tr_name, from_stn, to_stn, seats, fare } = req.body;
    const { error } = await supabase.from('train')
        .update({ tr_name, from_stn, to_stn, seats, fare })
        .eq('tr_no', tr_no);
    if (error) return res.json({ success: false, message: error.message });
    res.json({ success: true });
});

app.post('/api/deletetrain', async (req, res) => {
    const { tr_no } = req.body;
    const { error } = await supabase.from('train').delete().eq('tr_no', tr_no);
    if (error) return res.json({ success: false, message: error.message });
    res.json({ success: true });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'WebContent', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 JavaScript Backend Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
