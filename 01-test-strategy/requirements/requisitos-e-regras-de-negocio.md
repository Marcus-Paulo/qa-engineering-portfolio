# AccessControl Demo — Requisitos e Regras de Negócio

> Documento de estudo de caso para portfólio. O AccessControl Demo é um produto inteiramente fictício. Não representa sistemas, requisitos, dados ou processos internos de qualquer empresa.

## 1. Visão geral

O AccessControl Demo é uma aplicação web fictícia para gestão de pessoas e controle de acesso físico de uma organização.

O sistema permite cadastrar pessoas, associar credenciais, definir permissões por área e consultar eventos de acesso registrados pelos dispositivos.

### 1.1 Objetivo do produto

Centralizar o gerenciamento de pessoas e suas permissões de acesso, oferecendo rastreabilidade das tentativas de entrada e saída.

### 1.2 Perfis de usuário

| Perfil | Descrição |
|---|---|
| Administrador | Possui acesso completo a todas as funcionalidades do sistema. |
| Operador | Pode consultar pessoas, credenciais e eventos; cadastrar e editar pessoas. Não pode gerenciar credenciais, alterar permissões de acesso nem gerenciar usuários do sistema. |

**Premissa do estudo:** a autenticação de usuários da aplicação será considerada existente. O escopo inicial testa as funcionalidades após o usuário estar autenticado.

## 2. Escopo da primeira versão

### Dentro do escopo

- Cadastro, consulta e edição de pessoas;
- Associação e gerenciamento de credenciais;
- Definição de permissões de acesso por área;
- Registro de eventos de acesso;
- Consulta e filtragem do histórico de eventos;
- Controle de permissões por perfil de usuário.

### Fora do escopo nesta versão

- Integração real com catracas, leitores biométricos ou dispositivos físicos;
- Aplicativos móveis;
- Integração com sistemas externos de RH;
- Autenticação multifator;
- Relatórios avançados e exportação de dados.

## 3. Requisitos funcionais

### RF-01 — Cadastro de pessoas

O sistema deve permitir que Administradores e Operadores cadastrem uma pessoa informando nome completo, CPF, e-mail e status do cadastro.

**Critérios de aceitação**
- Deve ser possível salvar um cadastro com todos os campos obrigatórios válidos.
- O sistema deve validar o formato do CPF.
- O sistema não deve permitir dois cadastros ativos com o mesmo CPF.
- Ao concluir o cadastro, o sistema deve apresentar confirmação e disponibilizar a pessoa na consulta.

### RF-02 — Consulta de pessoas

O sistema deve permitir que Administradores e Operadores consultem pessoas cadastradas por nome ou CPF.

**Critérios de aceitação**
- A consulta deve retornar registros compatíveis com o filtro informado.
- Quando não houver correspondência, o sistema deve informar que nenhum registro foi encontrado.
- Usuários sem permissão de consulta não devem acessar os dados.

### RF-03 — Edição de pessoas

O sistema deve permitir que Administradores e Operadores alterem os dados editáveis de uma pessoa cadastrada.

**Critérios de aceitação**
- As alterações devem ser persistidas após confirmação.
- O CPF deve permanecer único.
- O sistema deve apresentar mensagem de sucesso após salvar.
- Em caso de falha na gravação, os dados anteriores devem ser preservados.

### RF-04 — Associação de credencial

O sistema deve permitir que somente Administradores associem uma credencial a uma pessoa cadastrada.

**Critérios de aceitação**
- Somente pessoas existentes e ativas podem receber uma credencial.
- Cada pessoa pode possuir somente uma credencial associada.
- Uma credencial já associada a outra pessoa não pode ser reutilizada.
- A associação deve ficar visível no cadastro da pessoa.
- O sistema deve informar o resultado da operação.
- Operadores não podem associar credenciais.

### RF-05 — Bloqueio, desbloqueio e reativação de credencial

O sistema deve permitir que somente Administradores bloqueiem, desbloqueiem ou reativem uma credencial, respeitando as condições de validade.

**Critérios de aceitação**
- Uma credencial bloqueada ou inativada não deve autorizar acesso.
- Uma credencial desbloqueada pode voltar a ser utilizada, desde que esteja ativa, dentro do prazo de validade e as demais condições de acesso sejam atendidas.
- O sistema deve registrar a alteração de status.
- Operadores não podem bloquear, desbloquear ou reativar credenciais.

### RF-06 — Configuração de permissões por área

O sistema deve permitir que somente Administradores configurem as áreas às quais uma pessoa possui autorização de acesso.

**Critérios de aceitação**
- Deve ser possível conceder acesso a uma ou mais áreas disponíveis.
- Deve ser possível remover uma autorização anteriormente concedida.
- A alteração deve ser considerada nas próximas tentativas de acesso.
- Pessoas inativas não devem obter autorização, mesmo que possuam áreas associadas.
- Operadores não podem alterar permissões por área.

### RF-07 — Registro de evento de acesso

O sistema deve registrar uma tentativa de acesso realizada com uma credencial.

**Critérios de aceitação**
- O evento deve conter pessoa identificada, credencial, área, data/hora e resultado da tentativa, quando essas informações estiverem disponíveis.
- O resultado deve indicar acesso autorizado ou negado.
- O evento deve ser registrado mesmo quando o acesso for negado.
- Uma credencial inexistente ou não associada deve gerar tentativa negada.
- Após uma tentativa, a mesma credencial deve respeitar um intervalo de 10 segundos antes de uma nova tentativa.

### RF-08 — Consulta de eventos de acesso

O sistema deve permitir que Administradores e Operadores consultem o histórico de eventos de acesso.

**Critérios de aceitação**
- Deve ser possível filtrar eventos por pessoa, área, período e resultado.
- A consulta deve apresentar os eventos compatíveis com os filtros.
- Quando não houver eventos correspondentes, o sistema deve apresentar uma mensagem informativa.
- A ordenação padrão deve apresentar os eventos mais recentes primeiro.

## 4. Regras de negócio

| ID | Regra de negócio |
|---|---|
| RN-01 | O CPF deve ser único entre os cadastros de pessoas. |
| RN-02 | Somente pessoas com status ativo podem receber uma credencial. |
| RN-03 | Cada pessoa pode possuir somente uma credencial associada. Uma credencial não pode estar associada a mais de uma pessoa. |
| RN-04 | Credenciais bloqueadas ou inativadas não autorizam tentativas de acesso. |
| RN-05 | Ao inativar uma pessoa, sua credencial deve ser inativada automaticamente. Pessoas inativas não podem ter acesso autorizado, independentemente das permissões por área. |
| RN-06 | O acesso somente será autorizado quando a pessoa estiver ativa, a credencial estiver ativa, desbloqueada e dentro do prazo de validade, e houver permissão para a área solicitada. |
| RN-07 | Toda tentativa de acesso deve gerar um evento, seja ela autorizada ou negada, observadas as regras de intervalo entre tentativas. |
| RN-08 | A consulta de eventos deve respeitar as permissões do perfil do usuário autenticado. |
| RN-09 | O perfil Operador não pode gerenciar credenciais, alterar permissões de acesso nem gerenciar usuários do sistema. |
| RN-10 | Alterações de credencial e permissões devem produzir efeito nas próximas tentativas de acesso. |
| RN-11 | A credencial possui uma data de expiração e permanece válida até às 23h59 dessa data. Após esse limite, deve ser inativada automaticamente e não deve autorizar acesso. |
| RN-12 | Após uma tentativa de acesso, a mesma credencial deve aguardar 10 segundos antes de realizar uma nova tentativa. |

## 5. Matriz de decisão inicial — autorização de acesso

| Pessoa ativa | Credencial ativa, desbloqueada e válida | Permissão para a área | Resultado esperado |
|---|---|---|---|
| Sim | Sim | Sim | Autorizado |
| Não | Sim | Sim | Negado |
| Sim | Não | Sim | Negado |
| Sim | Sim | Não | Negado |
| Não | Não | Não | Negado |

A matriz representa as regras definidas para este estudo de caso. Cenários adicionais, como dispositivo indisponível, poderão ser incluídos em uma evolução futura do escopo.

## 6. Requisitos não funcionais iniciais

| ID | Categoria | Requisito |
|---|---|---|
| RNF-01 | Segurança | O sistema deve restringir operações conforme o perfil e as permissões do usuário autenticado. |
| RNF-02 | Integridade | O sistema deve impedir associação duplicada de credenciais a pessoas diferentes e mais de uma credencial associada à mesma pessoa. |
| RNF-03 | Rastreabilidade | As tentativas de acesso devem permanecer consultáveis no histórico de eventos. |
| RNF-04 | Privacidade | Dados pessoais exibidos e armazenados devem ser tratados de forma compatível com a finalidade do sistema. |
| RNF-05 | Desempenho | O tempo de resposta esperado deverá ser definido antes dos testes de performance, considerando ambiente e carga de referência. |

## 7. Decisões de negócio confirmadas

As respostas recebidas durante a análise de requisitos foram incorporadas ao escopo:

| Tema | Decisão confirmada | Impacto para QA |
|---|---|---|
| Quantidade de credenciais por pessoa | Cada pessoa poderá possuir somente uma credencial associada. | Testar tentativa de associar uma segunda credencial à mesma pessoa. |
| Inativação de pessoa | A credencial será inativada automaticamente quando a pessoa for inativada. | Validar a mudança automática de status e a negação de acesso posterior. |
| Expiração de credencial | A credencial permanece válida até às 23h59 da data informada e depois é inativada automaticamente. | Testar antes, no limite e após a expiração, incluindo a mudança automática de status. |
| Reativação após expiração | O Administrador poderá reativar uma credencial expirada. | Testar a permissão do Administrador e a restrição ao Operador. |
| Intervalo entre tentativas | A mesma credencial deve aguardar 10 segundos após uma tentativa antes de tentar novamente. | Testar uma nova tentativa antes de completar 10 segundos e após o intervalo. |
| Perfis de usuário | Existem somente Administrador e Operador. Administrador possui acesso completo; Operador possui acesso restrito. | Testar permissões positivas e negativas de cada perfil. |

### 7.1 Permissões por perfil

| Funcionalidade | Administrador | Operador |
|---|---|---|
| Consultar pessoas | Permitido | Permitido |
| Cadastrar pessoas | Permitido | Permitido |
| Editar pessoas | Permitido | Permitido |
| Consultar credenciais | Permitido | Permitido |
| Consultar eventos de acesso | Permitido | Permitido |
| Associar credenciais | Permitido | Não permitido |
| Bloquear credenciais | Permitido | Não permitido |
| Desbloquear credenciais | Permitido | Não permitido |
| Reativar credenciais | Permitido | Não permitido |
| Configurar permissões por área | Permitido | Não permitido |
| Gerenciar usuários do sistema | Permitido | Não permitido |

O Administrador possui acesso completo ao sistema, inclusive às funcionalidades não listadas individualmente.

### 7.2 Regras adicionais derivadas das decisões

- Uma pessoa não pode ter mais de uma credencial associada.
- A inativação da pessoa deve inativar automaticamente sua credencial.
- A credencial permanece válida até às 23h59 da data de expiração e deve ser inativada automaticamente após esse limite.
- O Administrador pode reativar credenciais expiradas; o Operador não possui essa permissão.
- Após uma tentativa de acesso, a mesma credencial deve respeitar 10 segundos de intervalo antes de nova tentativa.
- O Administrador possui acesso completo ao sistema.
- O Operador pode consultar pessoas, credenciais e eventos, além de cadastrar e editar pessoas. Não pode associar, bloquear, desbloquear ou reativar credenciais, alterar permissões por área ou gerenciar usuários.

## 8. Pontos em aberto e decisões necessárias

Os pontos abaixo ainda não foram especificados e não devem ser tratados como regras confirmadas:

1. Quando uma credencial expira e é reativada pelo Administrador, a data de expiração deve ser atualizada para uma data futura antes da reativação?
2. Se uma credencial for inativada ou substituída, a pessoa poderá receber uma nova credencial ou a regra de uma credencial por pessoa impede qualquer associação futura?
3. O intervalo de 10 segundos deve ser contado a partir do início ou da conclusão do processamento da tentativa? Durante o intervalo, uma nova tentativa deve ser recusada com mensagem específica ou apenas ignorada?
4. O intervalo de 10 segundos deve ser aplicado também a tentativas negadas?
5. Quais campos, além dos listados, são obrigatórios no cadastro de pessoa?
6. O CPF pode ser alterado após o cadastro?
7. Quais áreas estarão disponíveis e quem pode cadastrá-las?
8. Qual fuso horário deve ser utilizado na gravação e exibição dos eventos?
9. Qual o volume esperado de pessoas, credenciais e eventos?
10. Quais campos pessoais devem ser mascarados?
11. Quais operações devem ser registradas em auditoria além das tentativas de acesso?

**Tratamento para o portfólio:** os pontos em aberto serão registrados como dúvidas de requisito, e não tratados como regras confirmadas. As decisões adotadas em versões futuras serão documentadas.

## 9. Próxima atividade de QA

Com os requisitos e regras iniciais definidos, a próxima entrega será a análise de cobertura:

- Identificar cenários positivos, negativos e alternativos para cada requisito;
- Relacionar requisitos funcionais, regras de negócio e casos de teste;
- Priorizar cenários conforme risco;
- Preparar os casos de teste em formato rastreável;
- Registrar lacunas que dependem de decisão de produto.

## 10. Histórico do documento

| Versão | Descrição |
|---|---|
| 1.0 | Criação do escopo inicial, requisitos funcionais, critérios de aceitação e regras de negócio para o AccessControl Demo. |
| 1.1 | Inclusão das decisões sobre quantidade de credenciais, inativação automática, expiração, intervalo de 10 segundos e perfis de acesso. |
| 1.2 | Detalhamento das permissões de Administrador e Operador e atualização dos pontos ainda pendentes de definição. |
| 1.3 | Confirmação do intervalo de 10 segundos por credencial, validade até 23h59 da data de expiração, reativação pelo Administrador e proibição de gerenciamento de credenciais pelo Operador. |
