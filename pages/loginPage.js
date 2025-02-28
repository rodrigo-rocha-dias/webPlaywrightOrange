const LoginElements = require('../elements/login.elements');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.baseURL = page.context()._options.baseURL;
  }

  async visitarPagina() {
    await this.page.goto(this.baseURL);
  }

  async login() {
    await this.page.locator(LoginElements.usernameField).fill('Admin');
    await this.page.locator(LoginElements.passwordField).fill('admin123');
    await this.page.locator(LoginElements.loginButton).click();
  }
}

module.exports = LoginPage;


