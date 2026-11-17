# Playwright + TypeScript — AccessControl Demo

## Objetivo

Demonstrar automação de testes end-to-end para a aplicação fictícia AccessControl Demo, utilizando Playwright Test, TypeScript e Page Object Model.

A aplicação de laboratório e a suíte de automação estão neste repositório, em diretórios separados. A suíte utiliza a aplicação local como alvo de testes.

## Tecnologias

- Playwright Test;
- TypeScript;
- Node.js e npm;
- dotenv para configuração local;
- React + Vite na aplicação de demonstração.

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
└── tsconfig.json
```

## Pré-requisitos

- Node.js LTS;
- npm;
- Git.

## Configuração local

Na raiz do repositório, instale as dependências da aplicação e da automação:

```powershell
cd 06-end-to-end-project/accesscontrol-demo-app
npm install

cd ../../../02-automation/playwright-typescript
npm install
npx playwright install chromium
```

Crie o arquivo local `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

O exemplo já aponta para a aplicação Vite em `http://127.0.0.1:5173`. Preencha as credenciais demonstrativas locais:

```env
BASE_URL=http://127.0.0.1:5173
E2E_USER=admin
E2E_PASSWORD=Admin123!
```

Essas credenciais são exclusivas do protótipo local. Não utilize dados pessoais reais. O arquivo `.env` não deve ser versionado.

## Execução

A configuração do Playwright inicia automaticamente o servidor Vite da aplicação quando necessário. Portanto, não é preciso abrir um terminal separado para iniciar a aplicação.

Executar toda a suíte:

```powershell
npx playwright test
```

Executar com navegador visível:

```powershell
npx playwright test --headed
```

Abrir o relatório HTML:

```powershell
npx playwright show-report
```

Verificar os tipos TypeScript:

```powershell
npm run typecheck
```

## Cenários automatizados — módulo Pessoas

| # | Cenário | Cobertura |
|---:|---|---|
| 1 | Cadastrar pessoa com dados válidos | Fluxo positivo |
| 2 | Impedir cadastro sem campos obrigatórios | Validação negativa |
| 3 | Impedir cadastro com e-mail inválido | Validação negativa |
| 4 | Pesquisar pessoa pelo nome | Consulta |
| 5 | Pesquisar pessoa pelo CPF | Consulta |
| 6 | Editar e-mail de pessoa cadastrada | Edição |
| 7 | Inativar pessoa e manter registro consultável | Estado e consulta |
| 8 | Cancelar edição sem persistir alterações | Cancelamento |
| 9 | Manter dados após atualizar a página | Persistência local |
| 10 | Impedir CPF duplicado entre pessoas ativas | Regra de negócio |

Os dados de teste são sintéticos e gerados dinamicamente. A suíte utiliza o perfil Administrador da aplicação de demonstração.

## Boas práticas aplicadas

- Page Objects para separar interação com a interface e lógica dos testes;
- Seletores estáveis por `data-testid` quando disponíveis;
- Dados de teste dinâmicos;
- Credenciais configuradas por variáveis de ambiente;
- Execução paralela;
- Screenshot, vídeo e trace em caso de falha;
- Asserções de comportamento e resultado.

## Resultado de referência

A suíte de 10 cenários foi executada localmente pelo autor, com os 10 testes reportados como aprovados. A execução deve ser repetida no ambiente de quem clonar o repositório; não há garantia de resultado em outros ambientes.

## Limitações conhecidas

- A aplicação é um protótipo front-end, sem backend ou banco de dados;
- Autenticação é simulada no navegador e não oferece segurança de produção;
- Persistência utiliza `localStorage`;
- Módulos de credenciais, permissões por área e eventos ainda não foram implementados;
- Reutilização de CPF após inativação ainda é uma regra de negócio a confirmar, não um requisito estabelecido;
- A validação atual de CPF verifica quantidade de dígitos, não os dígitos verificadores.

## Próximas evoluções

1. Validar a primeira execução do workflow no GitHub Actions e corrigir eventuais falhas;
2. Confirmar regras de negócio pendentes antes de implementá-las;
3. Evoluir os módulos de credenciais e controle de acesso;
4. Separar testes de API quando houver uma API real;
5. Desenvolver um estudo de performance quando houver backend e endpoints adequados.

**Status:** módulo Pessoas automatizado com 10 cenários; próximo foco é integração contínua e evolução incremental do laboratório.
