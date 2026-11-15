# AccessControl Demo — Aplicação de laboratório

Aplicação fictícia criada para praticar QA manual, automação E2E, testes de API e performance. Não representa um produto ou ambiente de produção.

## Escopo desta primeira versão

- Login local com dois perfis demonstrativos;
- Cadastro de pessoas;
- Listagem e pesquisa por nome/CPF;
- Edição de dados da pessoa;
- Validação de campos e CPF com 11 dígitos;
- Prevenção de CPF duplicado entre pessoas ativas;
- Persistência local no navegador via `localStorage`.

## Contas demonstrativas

| Perfil | Usuário | Senha |
|---|---|---|
| Administrador | `admin` | `Admin123!` |
| Operador | `operador` | `Operador123!` |

**Aviso:** autenticação simulada no front-end, exclusivamente para laboratório local. Não é segura e não deve ser utilizada em produção. Não há backend nem controle de acesso real no servidor nesta etapa.

## Requisitos

- Node.js LTS;
- npm.

## Executar localmente

Na pasta `06-end-to-end-project/accesscontrol-demo-app`:

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (por padrão, http://127.0.0.1:5173).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Persistência e massa de dados

Os cadastros são armazenados no `localStorage` do navegador. Para reiniciar a massa local, abra as ferramentas de desenvolvedor do navegador e remova as chaves:

- `accesscontrol-demo-people`
- `accesscontrol-demo-session`

Utilize somente dados sintéticos.

## Integração com a automação Playwright

A suíte está em `02-automation/playwright-typescript`. Para apontá-la para a aplicação local, configure:

```env
BASE_URL=http://127.0.0.1:5173
E2E_USER=admin
E2E_PASSWORD=Admin123!
```

A interface fornece os seletores `data-testid` esperados pelos Page Objects. Os cenários podem ser executados depois de iniciar a aplicação.

## Limitações conhecidas desta versão

- Sem backend, API ou banco de dados;
- Sessão e autenticação simuladas no navegador;
- Regras de autorização por perfil ainda não estão protegidas por servidor;
- Módulos de credenciais, permissões por área e eventos ainda não implementados;
- Expiração de credenciais e intervalo de 10 segundos ainda não implementados;
- Regras pendentes do documento de requisitos permanecem sem decisão;
- Validação de CPF nesta versão verifica quantidade de dígitos, não o cálculo dos dígitos verificadores.

## Próximas etapas

1. Validar build e execução local;
2. Executar os testes E2E de cadastro e corrigir eventuais divergências;
3. Implementar edição/validações complementares e permissões;
4. Implementar credenciais e regras de acesso;
5. Criar API e persistência para permitir testes de API e performance.
