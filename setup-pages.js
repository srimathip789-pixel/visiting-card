const { chromium } = require('playwright');

(async () => {
  console.log("Launching browser for you...");
  
  // Launch visibly so you can interact with it
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Go straight to the settings page
  const targetUrl = 'https://github.com/srimathip789-pixel/visiting-card/settings/pages';
  console.log(`Navigating to ${targetUrl}`);
  await page.goto(targetUrl);
  
  console.log("--------------------------------------------------");
  console.log("ACTION REQUIRED IN THE BROWSER:");
  console.log("1. Please log in to your GitHub account if prompted.");
  console.log("2. Once on the Pages settings, look for 'Build and deployment'.");
  console.log("3. Under 'Branch', change 'None' to 'main'.");
  console.log("4. Click 'Save'.");
  console.log("--------------------------------------------------");
  
  console.log("I will keep this browser open for 3 minutes for you to complete this.");
  
  // Keep the browser open for 3 minutes so the user has time to log in and click save
  await page.waitForTimeout(180000);
  
  await browser.close();
  console.log("Browser closed. Your site should be live at https://srimathip789-pixel.github.io/visiting-card/ within 2 minutes!");
})();
