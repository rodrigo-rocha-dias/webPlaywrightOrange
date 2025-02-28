const { defineConfig } = require('@playwright/test');
const ambiente = process.env.AMBIENTE || 'hml';

const urls = {
  hml: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  prd: 'https://prd.opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  dev: 'https://dev.opensource-demo.orangehrmlive.com/web/index.php/auth/login'
};

module.exports = defineConfig({
  use: {
    baseURL: urls[ambiente],
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
})
