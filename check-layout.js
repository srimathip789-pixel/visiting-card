const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file://' + path.resolve('index.html');
  await page.goto(fileUrl);
  
  // Wait a moment for fonts to load
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'card_mockup.png' });
  
  const issues = await page.evaluate(() => {
    const problems = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      // Check for overflow
      const style = window.getComputedStyle(el);
      if (style.overflow === 'hidden') return;
      
      if (el.scrollWidth > el.clientWidth && el.clientWidth > 0) {
        problems.push(`Overflow Width on: <${el.tagName.toLowerCase()} class="${el.className}"> - ScrollWidth: ${el.scrollWidth}, ClientWidth: ${el.clientWidth}`);
      }
      if (el.scrollHeight > el.clientHeight && el.clientHeight > 0) {
        // Some elements naturally have larger scrollHeight like body/html, ignore those
        if (['html', 'body', 'main', 'div'].includes(el.tagName.toLowerCase())) {
            // Ignore standard containers unless it's a specific card container
            if (el.classList.contains('visiting-card') || el.classList.contains('blue-ribbon')) {
                problems.push(`Overflow Height on: <${el.tagName.toLowerCase()} class="${el.className}">`);
            }
        } else {
            problems.push(`Overflow Height on: <${el.tagName.toLowerCase()} class="${el.className}">`);
        }
      }
    });

    // Check if ribbons cover text
    return problems;
  });

  if (issues.length > 0) {
    console.log("Found Layout Issues:");
    issues.forEach(i => console.log("- " + i));
  } else {
    console.log("No obvious overflow issues found.");
  }
  
  await browser.close();
})();
