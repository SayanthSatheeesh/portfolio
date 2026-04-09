import { test, expect } from '@playwright/test';
import path from 'path';

const filePath = `file://${path.resolve(__dirname, '../index3.html')}`;

test.describe('Portfolio Visual & Structural Checks', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(filePath);
  });

  test('Hero section should not contain floating cards', async ({ page }) => {
    const heroSection = page.locator('#home');
    const cards = heroSection.locator('.floating-card');
    await expect(cards).toHaveCount(0);
  });

  test('Education section should be present and visible', async ({ page }) => {
    const eduSection = page.locator('#education');
    await expect(eduSection).toBeVisible();
    
    // Check for the timeline wire
    const wire = page.locator('.timeline-wire-wrap');
    await expect(wire).toBeVisible();
  });

  test('Education cards should contain correct school details', async ({ page }) => {
    const schools = [
      'SSGHSS KANDANGALI',
      'GURUDEV ARTS AND SCIENCE COLLEGE',
      'LEAD COLLEGE (AUTONOMOUS)'
    ];

    for (const school of schools) {
      const schoolEl = page.locator(`.edu-school:has-text("${school}")`);
      await expect(schoolEl).toBeVisible();
      // Ensure the text color is correctly applied (full visibility check)
      const color = await schoolEl.evaluate((el) => window.getComputedStyle(el).color);
      // It should be white (rgb(255, 255, 255)) or close to it
      expect(color).toBe('rgb(255, 255, 255)');
    }
  });

  test('Navigation links should exist and have correct hrefs', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(4);
    
    const expectedHrefs = ['#home', '#skills', '#projects', '#contact'];
    for (let i = 0; i < 4; i++) {
      await expect(navLinks.nth(i)).toHaveAttribute('href', expectedHrefs[i]);
    }
  });
});
