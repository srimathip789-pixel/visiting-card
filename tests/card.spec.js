const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Digital Visiting Card', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local index.html file
    const fileUrl = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUrl);
    // Give fonts and SVGs a moment to load
    await page.waitForTimeout(500);
  });

  test('should render exactly two card faces', async ({ page }) => {
    const cards = page.locator('.visiting-card');
    await expect(cards).toHaveCount(2);
  });

  test('should have correct names on front and back', async ({ page }) => {
    // Front card
    const frontName = page.locator('.name');
    await expect(frontName).toHaveText('M. SRI MATHI');

    // Back card
    const lFirst = page.locator('.l-first');
    const lLast = page.locator('.l-last');
    await expect(lFirst).toHaveText('SRI SHIV');
    await expect(lLast).toHaveText('PRAKASH');
  });

  test('should have properly encoded QR code', async ({ page }) => {
    const qrCode = page.locator('.qr-code');
    const src = await qrCode.getAttribute('src');
    
    // Check it's using quickchart.io
    expect(src).toContain('quickchart.io');
    
    // Check that spaces in the text parameter are properly double encoded as %2520
    expect(src).toContain('%2520');
  });

  test('should not have any layout overflow issues', async ({ page }) => {
    const overflowIssues = await page.evaluate(() => {
      const problems = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        // Ignore elements that intentionally hide overflow
        if (style.overflow === 'hidden') return;
        
        if (el.scrollWidth > el.clientWidth && el.clientWidth > 0) {
          problems.push(`Width overflow on ${el.tagName}.${el.className}`);
        }
      });
      return problems;
    });

    // Expect empty array (no layout issues)
    expect(overflowIssues).toEqual([]);
  });

  test('should trigger PDF download', async ({ page }) => {
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    
    // Click the download button
    await page.locator('.btn-pdf').click();
    
    const download = await downloadPromise;
    
    // Verify download triggered successfully with expected filename
    expect(download.suggestedFilename()).toBe('Sri_Mathi_Business_Card.pdf');
  });

});
