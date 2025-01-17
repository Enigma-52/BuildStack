import puppeteer from 'puppeteer';

const routes = [
  '/',
  '/home',
  '/profile/382fb6f9-6112-408d-9280-520eec29b785', // Example userId
  '/newsletter',
  '/createProduct',
  '/profile/edit',
  '/changelog',
  '/categories/Productivity', // Example category id
  '/categories',
  '/product/Grain', // Example product id
  '/admin',
  '/admin/analytics',
  '/admin/issues',
  '/admin/reports',
  '/admin/settings',
  '/discussions',
  '/advertise',
  '/contactus',
  '/notifications'
];

const testRoutes = async () => {
  let browser = null;
  let page = null;
  const timeout = 5000;

  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    page = await browser.newPage();
    page.setDefaultTimeout(timeout);

    // Collect console messages
    let consoleMessages = [];
    page.on('console', (message) => {
      consoleMessages.push({
        type: message.type(),
        text: message.text()
      });
    });

    for (const route of routes) {
      try {
        console.log(`Testing route: ${route}`);
        
        // Clear console messages for new route
        consoleMessages = [];
        
        // Visit the route and wait for network idle
        await page.goto(`http://localhost:5173${route}`, {
          waitUntil: ['networkidle0', 'domcontentloaded']
        });

        // Check if React app root is present
        await page.waitForSelector('div#root', { timeout });

        // Use a Promise to wait a short time for console messages
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check for React Router "No routes matched location" warning
        const hasRouteError = consoleMessages.some(msg => 
          msg.text.includes('No routes matched location') ||
          msg.text.includes('No routes matched')
        );

        if (hasRouteError) {
          throw new Error('Route not found in React Router');
        }

        // Check for empty or white screen
        const hasContent = await page.evaluate(() => {
          const root = document.getElementById('root');
          if (!root) return false;
          
          // Check if root has any visible content
          const hasVisibleContent = root.innerText.trim().length > 0;
          
          // Check if root has any child elements
          const hasChildren = root.children.length > 0;
          
          return hasVisibleContent || hasChildren;
        });

        if (!hasContent) {
          throw new Error('Page is empty (white screen)');
        }
        
        console.log(`✅ ${route} - Page loaded successfully with content`);
      } catch (err) {
        console.error(`❌ ${route} - Failed:`, err instanceof Error ? err.message : String(err));
        process.exit(1); // Exit on first failure
      }
    }

    console.log('\n✨ All valid routes loaded successfully!');

    // Test an invalid route
    try {
      const invalidRoute = '/asdasd';
      console.log('\nTesting invalid route detection...');
      
      // Clear console messages
      consoleMessages = [];
      
      await page.goto(`http://localhost:5173${invalidRoute}`, {
        waitUntil: ['networkidle0', 'domcontentloaded']
      });
      
      // Wait a bit for console messages
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Should detect React Router warning
      const hasRouteError = consoleMessages.some(msg => 
        msg.text.includes('No routes matched location') ||
        msg.text.includes('No routes matched')
      );

      if (!hasRouteError) {
        console.error('❌ Invalid route was not detected');
        process.exit(1);
      }
      
      console.log('✅ Invalid route correctly detected');
    } catch (err) {
      console.log('✅ Invalid route correctly triggered error');
    }

  } catch (err) {
    console.error('Critical error during testing:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};


// Execute the tests
testRoutes();