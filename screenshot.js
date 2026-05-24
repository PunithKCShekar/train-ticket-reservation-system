const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for a nice desktop screenshot
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Capturing Login Page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'Screenshots/login.png' });
  await page.screenshot({ path: 'Screenshots/premium_ui.png' }); // Just duplicate for README cover

  console.log('Capturing Register Page...');
  await page.goto('http://localhost:3000/UserRegister.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'Screenshots/registeruser.png' });

  // For UserHome and AdminHome, they require sessionStorage.
  // We can inject it before navigating or after navigating and then reload.
  console.log('Capturing User Dashboard...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
      sessionStorage.setItem('user', JSON.stringify({ fname: 'Shashi', mailid: 'shashi@demo.com' }));
  });
  await page.goto('http://localhost:3000/UserHome.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'Screenshots/userhome.png' });

  console.log('Capturing Admin Login...');
  await page.goto('http://localhost:3000/AdminLogin.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'Screenshots/admin_login.png' });

  console.log('Capturing Admin Dashboard...');
  await page.goto('http://localhost:3000/AdminHome.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'Screenshots/adminhome.png' });

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
