import  puppeteer from 'puppeteer' ;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  try {
    // Visit the React app
    await page.goto("http://localhost:5173");
    console.log("Page loaded successfully");

    // Check if the app root element is present (Example: div#root)
    await page.waitForSelector('div#root', { timeout });
    console.log("React app rendered correctly");

  } catch (err) {
    console.log('Page failed to load', err);
    process.exit(1);  // Fail the workflow if the page doesn't load
  } finally {
    await browser.close();
  }
})();
