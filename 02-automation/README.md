# 02 — Automação de testes

## Objetivo
Apresentar exemplos de automação organizados, legíveis e reproduzíveis, demonstrando seleção de cenários, estrutura de código e análise dos resultados.

## Tecnologias
- Playwright com TypeScript;
- Robot Framework com Selenium.

## Escopo planejado
- [ ] Fluxo de autenticação: sucesso, falha e validações;
- [ ] Organização por páginas/componentes (Page Object quando adequado);
- [ ] Dados de teste e configuração por ambiente;
- [ ] Evidências em falhas e relatórios;
- [ ] Execução headless e instruções locais;
- [ ] Boas práticas para estabilidade e manutenção.

## Estrutura prevista
```text
02-automation/
├── README.md
├── playwright-typescript/
│   └── README.md
└── robot-framework-selenium/
    └── README.md
```

## Critérios de qualidade
- Testes independentes e com objetivo explícito;
- Seletores resilientes e sincronização adequada;
- Dados e segredos fora do código-fonte;
- Asserções que validem comportamento, não apenas presença de elementos;
- README com pré-requisitos e comandos reais de execução.

**Status:** estrutura inicial criada. Os exemplos executáveis serão publicados e validados separadamente.
