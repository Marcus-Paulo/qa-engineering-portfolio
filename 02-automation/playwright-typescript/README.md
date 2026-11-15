# Playwright + TypeScript — AccessControl Demo

## Objetivo

Demonstrar automação de testes end-to-end para o produto fictício AccessControl Demo, utilizando Playwright, TypeScript e Page Object Model.

> **Importante:** este repositório contém a estrutura inicial e os testes preparados. A aplicação AccessControl Demo ainda não está implementada/disponibilizada neste projeto. Portanto, os testes ainda não foram executados e seus seletores representam o contrato de interface esperado para a futura aplicação.

## Estrutura

```text
playwright-typescript/
├── pages/
│   ├── LoginPage.ts
│   └── PessoasPage.ts
├── tests/
│   └── pessoas.spec.ts
├── utils/
│   └── testData.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Tecnologias

- Playwright Test;
- TypeScript;
- Node.js;
- dotenv para configuração local.

## Pré-requisitos

- Node.js em versão LTS;
- npm;
- Aplicação AccessControl Demo disponível em ambiente de teste;
- Usuário de teste com perfil Administrador.

## Configuração local

1. Acesse este diretório:

```bash
cd 02-automation/playwright-typescript
```

2. Instale as dependências:

```bash
npm install
npx playwright install chromium
```

3. Copie o arquivo de exemplo para `.env`:

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

4. Configure no arquivo `.env` a URL da aplicação e as credenciais de teste:

```env
BASE_URL=http://127.0.0.1:3000
E2E_USER=usuario_de_teste
E2E_PASSWORD=senha_de_teste
```

Não compartilhe o arquivo `.env` nem credenciais reais. O arquivo está incluído no `.gitignore`.

## Cenários preparados

| Cenário | Objetivo |
|---|---|
| Cadastro com dados válidos | Validar gravação e exibição da pessoa cadastrada |
| Cadastro sem campos obrigatórios | Validar bloqueio do envio e feedback de validação |

Os dados de pessoa são gerados dinamicamente para reduzir colisões entre execuções. O CPF é sintético e não deve ser utilizado como dado real.

## Contrato de seletores esperado

Para que os exemplos possam interagir com a interface, a aplicação deverá disponibilizar seletores estáveis:

| Elemento | Seletor esperado |
|---|---|
| Usuário no login | `data-testid="login-username"` |
| Senha no login | `data-testid="login-password"` |
| Botão entrar | `data-testid="login-submit"` |
| Botão nova pessoa | `data-testid="person-new"` |
| Campo nome | `data-testid="person-name"` |
| Campo CPF | `data-testid="person-cpf"` |
| Campo e-mail | `data-testid="person-email"` |
| Botão salvar | `data-testid="person-save"` |
| Mensagem de sucesso | `data-testid="person-success-message"` |
| Mensagem de validação | `data-testid="person-validation-message"` |
| Linha da pessoa | `data-testid="person-row-{CPF}"` |

Também é esperado que o login bem-sucedido direcione para `/pessoas`, e que a tela de cadastro esteja acessível em `/pessoas`. Esses caminhos devem ser ajustados caso a aplicação adote rotas diferentes.

## Execução

Executar todos os testes:

```bash
npm test
```

Executar com navegador visível:

```bash
npm run test:headed
```

Abrir relatório HTML:

```bash
npm run test:report
```

Verificar tipos TypeScript:

```bash
npm run typecheck
```

Os testes de cadastro são ignorados automaticamente quando `E2E_USER` ou `E2E_PASSWORD` não estão configurados. Isso evita uma tentativa de autenticação sem credenciais, mas não substitui a disponibilidade da aplicação.

## Boas práticas aplicadas

- Page Objects para separar interação com a interface da lógica dos testes;
- Seletores por `data-testid` para reduzir dependência de CSS e texto visual;
- Dados sintéticos e dinâmicos;
- Credenciais em variáveis de ambiente;
- Screenshot, vídeo e trace em caso de falha;
- Asserções de resultado após a ação, e não apenas execução de cliques.

## Próximas evoluções

- Implementar e disponibilizar a aplicação de demonstração;
- Ajustar os seletores e rotas ao DOM real;
- Executar os testes e registrar resultados reais;
- Adicionar cenários de edição, CPF duplicado e tratamento de falha;
- Integrar execução contínua (CI).

**Status:** estrutura inicial criada; testes ainda não executados contra uma aplicação real.
