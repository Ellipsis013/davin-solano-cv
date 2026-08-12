const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    // Ensure the public directory exists
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Default Chrome paths depending on Operating System
    let executablePath = '';
    if (process.platform === 'win32') {
      executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    } else if (process.platform === 'darwin') {
      executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    } else {
      executablePath = '/usr/bin/google-chrome';
    }

    const browser = await puppeteer.launch({
      executablePath: executablePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Load local index.html
    const indexPath = path.join(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`, { waitUntil: 'networkidle0' });

    // Enable Classic GUI Mode so full resume renders
    await page.evaluate(() => {
      document.body.classList.add('gui-mode');
    });

    // Generate PDF matching clean print styles
    const pdfPath = path.join(publicDir, 'resume.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false, // Removes top dates & bottom URLs
      margin: { top: '8mm', right: '10mm', bottom: '8mm', left: '10mm' }
    });

    await browser.close();
    console.log(`✅ Success: Generated resume.pdf at ${pdfPath}`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
})();