const { Before, After, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium, devices } = require('playwright');
const fs = require('fs');
const config = require('../playwright.config');

setDefaultTimeout(30 * 1000);

Before(async function () {
  console.log(`Ambiente: ${config.use.baseURL}`);

  this.browser = await chromium.launch({ headless: config.use.headless });
  this.context = await this.browser.newContext({
    baseURL: config.use.baseURL,
    viewport: config.use.viewport
  });

  this.page = await this.context.newPage();
  await this.context.clearCookies();
  await this.context.clearPermissions();

  await this.page.goto(config.use.baseURL, { waitUntil: 'load' });

  try {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    console.log("Cache, cookies e storage limpos.");
  } catch (error) {
    console.warn("Não foi possível limpar localStorage/sessionStorage nesta página.", error);
  }
})

After(async function (scenario) {
  const featureName = scenario.gherkinDocument.feature.name.replace(/[^a-zA-Z0-9-_]/g, '_');
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testResultsDir = 'reports/screenshots';
  const reportDir = 'reports/screenshots';

  if (!fs.existsSync(testResultsDir)) fs.mkdirSync(testResultsDir, { recursive: true });
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const screenshotPath = `${testResultsDir}/${featureName}_${scenarioName}_${timestamp}.png`;

  if (scenario.result.status === Status.FAILED) {
    try {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot salvo em: ${screenshotPath}`);
    } catch (error) {
      console.warn(`Erro ao tirar screenshot: ${error.message}`);
    }

    console.log(`Cenário "${scenarioName}" falhou.`);
  }

  try {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  } catch (error) {
    console.warn(`Erro ao fechar navegador: ${error.message}`);
  }
})