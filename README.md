# WebPlaywrightOrange

Este projeto utiliza **Playwright** com **Cucumber** e **JavaScript**, seguindo as melhores práticas como o **Page Object Model (POM)** e a reutilização de passos e páginas através de **Utils**.

## 📌 Tecnologias Utilizadas

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- JavaScript (Node.js)
- Page Object Model (POM)

## 📂 Estrutura do Projeto

```
WebPlaywrightOrange/
├── .github/workflows/        # Configuração do GitHub Actions para CI/CD
├── config/                   # Configurações gerais do projeto
├── elements/                 # Elementos utilizados no Page Object Model (POM)
│   ├── login.elements.js
├── features/                 # Arquivos .feature do Cucumber
│   ├── login.feature
├── pages/                    # Implementação do Page Object Model (POM)
│   ├── loginPage.js
│   ├── utilPage.js
├── reports/                  # Relatórios gerados após a execução dos testes
│   ├── screenshots/          # Capturas de tela em caso de falha
│   │   ├── .keep             # Placeholder para manter o diretório no repositório
│   ├── cucumber-report.html  # Relatório HTML detalhado
│   ├── cucumber-report.json  # Relatório JSON com dados da execução
├── steps/                    # Step Definitions do Cucumber
│   ├── login.steps.js
│   ├── util.steps.js
├── support/                  # Configurações do Cucumber
│   ├── hooks.js              # Configuração de antes e depois dos testes
│   ├── world.js              # Contexto compartilhado entre os testes
├── test-results/             # Armazena resultados temporários dos testes
├── utils/                    # Funções utilitárias para reutilização de código
│   ├── cucumber.js           # Configuração do Cucumber
│   ├── generateReport.js     # Geração automática de relatórios pós-execução
├── playwright.config.js      # Configuração do Playwright
├── package.json              # Dependências e scripts do projeto
├── README.md                 # Documentação do projeto
```

## 🚀 Instalação

Antes de começar, certifique-se de ter o **Node.js** instalado em sua máquina.

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/WebPlaywrightOrange.git
   cd WebPlaywrightOrange
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Instale o Playwright:
   ```sh
   npx playwright install --with-deps
   ```

## 🏗 Configuração do Projeto

### 📜 Arquivo `playwright.config.js`

```js
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
});
```

### 📜 Arquivo `cucumber.js`

```js
module.exports = {
  default: {
    require: ["./support/world.js", "./support/hooks.js", "./steps/**/*.js"],
    format: ["progress-bar"],
    publishQuiet: true,
    paths: ["features/*.feature"],
    worldParameters: {},
  },
};
```

## 🏗 Estrutura de Testes

### 📜 Exemplo de Feature File

```gherkin
Funcionalidade: Login

  Cenário: Login valido
    Dado que acesso a pagina de login da orange
    Quando fizer login com username e senha validos
    Então o titulo da pagina deve ser "Dashboard"
```

### 📜 Exemplo de Step Definition

```js
const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const { expect } = require('@playwright/test');

Given('que acesso a pagina de login da orange', async function () {
  this.LoginPage = new LoginPage(this.page);
  await this.LoginPage.visitarPagina();
});
```

### 📜 Exemplo de Page Object (POM)

```js
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
```

## 📸 Captura de Tela (Screenshots)
Os screenshots são armazenados em `reports/screenshots/` sempre que um teste falha. Isso facilita a identificação de erros.

## 📊 Relatórios
Após a execução dos testes, um relatório detalhado é gerado no diretório `reports/`.

- `cucumber-report.html`: Relatório HTML interativo
- `cucumber-report.json`: Dados brutos da execução dos testes

Para visualizar o relatório HTML:
```sh
open reports/cucumber-report.html
```

## ▶️ Executando os Testes

Para rodar os testes, utilize os comandos:
```sh
npm run test:hml  # Para rodar no ambiente HML
```
```sh
npm run test:prd  # Para rodar no ambiente PRD
```
```sh
npm run test:dev  # Para rodar no ambiente DEV
```

Caso queira rodar os testes no modo headful (com navegador visível), edite `playwright.config.js` e defina `headless: false`.

## 🏆 Melhores Práticas Utilizadas

✅ **Page Object Model (POM):** Facilita a manutenção e reutilização de código.

✅ **Utils:** Criamos uma `utilPage.js` e `util.step.js` para evitar repetição e centralizar funções comuns.

✅ **Cucumber com Gherkin:** Define cenários de teste de forma legível e bem organizada.

✅ **Geração de Relatórios:** Relatórios automáticos e screenshots são gerados para melhor análise das execuções.

✅ **CI/CD com GitHub Actions:** Pipeline automatizado para execução contínua dos testes.

