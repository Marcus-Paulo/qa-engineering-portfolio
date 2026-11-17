# 02 — Automação de testes

## Objetivo

Apresentar projetos de automação com objetivos distintos, código organizado, execução reproduzível e análise de resultados.

## Tecnologias

- Playwright com TypeScript;
- Robot Framework com Selenium.

## Projetos

### Playwright + TypeScript

Projeto E2E da aplicação fictícia AccessControl Demo. A suíte cobre cadastro, validações, pesquisa, edição, inativação e persistência do módulo Pessoas.

Consulte [Playwright + TypeScript](./playwright-typescript/README.md) para configuração, cenários, comandos de execução e limitações conhecidas.

**Status:** módulo Pessoas implementado com 10 cenários automatizados e execução local reportada como aprovada. Próxima evolução: integração contínua e ampliação de cobertura.

### Robot Framework + Selenium

Projeto independente para demonstrar automação de interface com Robot Framework e SeleniumLibrary. Não replica a suíte Playwright; terá foco em uma demonstração separada de keywords, recursos reutilizáveis e relatórios.

**Status:** planejamento/documentação inicial; scripts executáveis ainda serão desenvolvidos.

## Critérios de qualidade

- Testes independentes e com objetivo explícito;
- Seletores resilientes e sincronização adequada;
- Dados e segredos fora do código-fonte;
- Asserções que validem comportamento, não apenas presença de elementos;
- README com pré-requisitos e comandos de execução;
- Resultados e evidências registrados somente após execução real.
