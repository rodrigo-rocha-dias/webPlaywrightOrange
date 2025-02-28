# language: pt
Funcionalidade: Login

  Cenário: Login valido
    Dado que acesso a pagina de login da orange
    Quando fizer login com username e senha validos
    Então o titulo da pagina deve ser "Dashboard"
