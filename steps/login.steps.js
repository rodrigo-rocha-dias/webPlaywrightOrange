const { Given, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const { expect } = require('@playwright/test');

Given('que acesso a pagina de login da orange', async function () {
  this.LoginPage = new LoginPage(this.page);
  await this.LoginPage.visitarPagina();
})

Given('fizer login com username e senha validos', async function () {
  this.LoginPage = new LoginPage(this.page);
  await this.LoginPage.login();
})

Then('o titulo da pagina deve ser {string}', async function (nomeTela) {
  await expect(this.page.getByRole('heading', { name: nomeTela })).toBeVisible();
})
