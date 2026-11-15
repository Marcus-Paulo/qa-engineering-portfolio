# 02 — Automação de testes

## Objetivo

Apresentar exemplos de automação organizados, legíveis e reproduzíveis, demonstrando seleção de cenários, estrutura de código e análise dos resultados.

## Tecnologias

- Playwright com TypeScript;
- Robot Framework com Selenium.

## Projetos

### Playwright + TypeScript

A estrutura inicial do projeto foi criada para o AccessControl Demo, incluindo configuração, Page Objects, geração de dados sintéticos e cenários de cadastro de pessoas.

Consulte [Playwright + TypeScript](./playwright-typescript/README.md) para pré-requisitos, configuração, contrato de seletores e comandos.

**Status:** código inicial preparado; aguarda aplicação disponível para execução e validação.

### Robot Framework + Selenium

Estrutura planejada para demonstrar automação de fluxos web com Robot Framework e Selenium.

**Status:** planejamento/documentação inicial.

## Critérios de qualidade

- Testes independentes e com objetivo explícito;
- Seletores resilientes e sincronização adequada;
- Dados e segredos fora do código-fonte;
- Asserções que validem comportamento, não apenas presença de elementos;
- README com pré-requisitos e comandos de execução;
- Resultados e evidências registrados somente após execução real.
