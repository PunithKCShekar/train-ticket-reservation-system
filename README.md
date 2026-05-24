# 🚂 NITRTC - National Inter-city Train Reservation Center

## ✨ Modernized Architecture (2026)
This project has been completely overhauled from a legacy Java J2EE application into a blazing-fast, modern **Node.js & Express** web application with a sleek, **Apple-inspired Premium Light UI**.

### Key Upgrades:
- **Node.js Backend**: Entirely replaced the old Java/Tomcat server with a lightweight Express.js server.
- **Supabase Integration**: Migrated from local Oracle SQL to cloud-based PostgreSQL via Supabase for real-time, secure database connectivity.
- **Apple-Inspired UI**: A stunning, responsive "Premium Light" interface featuring glassmorphism, soft shadows, rounded corners, and fluid animations.
- **Graphical Seat Selection**: Visually select train seats before booking.
- **PDF Tickets**: Download beautiful boarding passes instantly via `html2pdf.js`.

---

### Features:
- **User Portal**:
  - Secure Login & Registration
  - Real-time Train Searching & Seat Availability
  - Graphical Seat Selection
  - Secure Booking & Mock Checkout Gateway
  - Ticket Cancellation & Instant Seat Refund
  - PDF Ticket Downloads
- **Admin Portal**:
  - Secure Admin Login
  - Add New Trains to the Network
  - Manage Active Roster

---

### 🚀 How to Run Locally

You no longer need Eclipse, Tomcat, or Oracle SQL! Just use Node.js.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Database**:
   Ensure you have your Supabase credentials in the `.env` file at the root of the project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

### Technologies Used
- **Frontend**: HTML5, Vanilla JavaScript, Premium CSS (Inter Font, Flexbox, CSS Grid)
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Libraries**: `html2pdf.js` (for ticket generation)

---

### 📸 Screenshots
All application views have been fully upgraded to the modern design. Check the live app on `localhost:3000` to experience the seamless animations and responsive UI!

*Built with ❤️ for modern train travel.*
