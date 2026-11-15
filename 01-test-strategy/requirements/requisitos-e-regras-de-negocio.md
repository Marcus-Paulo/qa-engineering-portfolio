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
| Administrador | Gerencia usuários, pessoas, credenciais, permissões e consulta eventos. |
| Operador | Consulta pessoas e eventos e realiza operações permitidas sobre credenciais. |
| Consulta | Possui acesso somente à visualização das informações autorizadas. |

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

O sistema deve permitir que um usuário com permissão cadastre uma pessoa informando nome completo, CPF, e-mail e status do cadastro.

**Critérios de aceitação**
- Deve ser possível salvar um cadastro com todos os campos obrigatórios válidos.
- O sistema deve validar o formato do CPF.
- O sistema não deve permitir dois cadastros ativos com o mesmo CPF.
- Ao concluir o cadastro, o sistema deve apresentar confirmação e disponibilizar a pessoa na consulta.

### RF-02 — Consulta de pessoas

O sistema deve permitir consultar pessoas cadastradas por nome ou CPF.

**Critérios de aceitação**
- A consulta deve retornar registros compatíveis com o filtro informado.
- Quando não houver correspondência, o sistema deve informar que nenhum registro foi encontrado.
- Usuários sem permissão de consulta não devem acessar os dados.

### RF-03 — Edição de pessoas

O sistema deve permitir alterar os dados editáveis de uma pessoa cadastrada.

**Critérios de aceitação**
- As alterações devem ser persistidas após confirmação.
- O CPF deve permanecer único.
- O sistema deve apresentar mensagem de sucesso após salvar.
- Em caso de falha na gravação, os dados anteriores devem ser preservados.

### RF-04 — Associação de credencial

O sistema deve permitir associar uma credencial a uma pessoa cadastrada.

**Critérios de aceitação**
- Somente pessoas existentes e ativas podem receber uma nova credencial.
- Uma credencial já associada a outra pessoa não pode ser reutilizada.
- A associação deve ficar visível no cadastro da pessoa.
- O sistema deve informar o resultado da operação.

### RF-05 — Bloqueio e desbloqueio de credencial

O sistema deve permitir bloquear e desbloquear uma credencial associada a uma pessoa.

**Critérios de aceitação**
- Uma credencial bloqueada não deve autorizar acesso.
- Uma credencial desbloqueada pode voltar a ser utilizada, desde que as demais condições de acesso sejam atendidas.
- O sistema deve registrar a alteração de status.
- Usuários sem permissão não devem realizar a operação.

### RF-06 — Configuração de permissões por área

O sistema deve permitir configurar as áreas às quais uma pessoa possui autorização de acesso.

**Critérios de aceitação**
- Deve ser possível conceder acesso a uma ou mais áreas disponíveis.
- Deve ser possível remover uma autorização anteriormente concedida.
- A alteração deve ser considerada nas próximas tentativas de acesso.
- Pessoas inativas não devem obter autorização, mesmo que possuam áreas associadas.

### RF-07 — Registro de evento de acesso

O sistema deve registrar uma tentativa de acesso realizada com uma credencial.

**Critérios de aceitação**
- O evento deve conter pessoa identificada, credencial, área, data/hora e resultado da tentativa, quando essas informações estiverem disponíveis.
- O resultado deve indicar acesso autorizado ou negado.
- O evento deve ser registrado mesmo quando o acesso for negado.
- Uma credencial inexistente ou não associada deve gerar tentativa negada.

### RF-08 — Consulta de eventos de acesso

O sistema deve permitir consultar o histórico de eventos de acesso.

**Critérios de aceitação**
- Deve ser possível filtrar eventos por pessoa, área, período e resultado.
- A consulta deve apresentar os eventos compatíveis com os filtros.
- Quando não houver eventos correspondentes, o sistema deve apresentar uma mensagem informativa.
- A ordenação padrão deve apresentar os eventos mais recentes primeiro.

## 4. Regras de negócio

| ID | Regra de negócio |
|---|---|
| RN-01 | O CPF deve ser único entre os cadastros de pessoas. |
| RN-02 | Somente pessoas com status ativo podem receber novas credenciais. |
| RN-03 | Cada pessoa pode possuir somente uma credencial ativa associada, e uma credencial não pode estar associada a mais de uma pessoa. |
| RN-04 | Credenciais bloqueadas ou inativadas não autorizam tentativas de acesso. |
| RN-05 | Ao inativar uma pessoa, sua credencial deve ser inativada automaticamente. Pessoas inativas não podem ter acesso autorizado, independentemente das permissões por área. |
| RN-06 | O acesso somente será autorizado quando a pessoa estiver ativa, a credencial estiver dentro do prazo de validade e desbloqueada e houver permissão para a área solicitada. |
| RN-07 | Toda tentativa de acesso deve gerar um evento, seja ela autorizada ou negada. |
| RN-08 | A consulta de eventos deve respeitar as permissões do perfil do usuário autenticado. |
| RN-09 | Usuários com perfil Consulta não podem criar, editar, bloquear ou desbloquear registros. |
| RN-10 | Alterações de credencial e permissões devem produzir efeito nas próximas tentativas de acesso. |\n| RN-11 | Uma credencial possui data de expiração; após essa data, não deve autorizar acesso. |\n| RN-12 | Após uma tentativa de acesso, deve existir um intervalo de espera antes de uma nova tentativa no mesmo contexto de acesso. A duração e as condições desse intervalo ainda precisam ser definidas. |

## 5. Matriz de decisão inicial — autorização de acesso

A autorização depende da combinação das condições abaixo:

| Pessoa ativa | Credencial válida e desbloqueada | Permissão para a área | Resultado esperado |
|---|---|---|---|
| Sim | Sim | Sim | Autorizado |
| Não | Sim | Sim | Negado |
| Sim | Não | Sim | Negado |
| Sim | Sim | Não | Negado |
| Não | Não | Não | Negado |

A matriz representa as regras definidas para este estudo de caso. Cenários adicionais, como credencial expirada ou dispositivo indisponível, poderão ser incluídos em uma evolução futura do escopo.

## 6. Requisitos não funcionais iniciais

| ID | Categoria | Requisito |
|---|---|---|
| RNF-01 | Segurança | O sistema deve restringir operações conforme o perfil e as permissões do usuário autenticado. |
| RNF-02 | Integridade | O sistema deve impedir associação duplicada da mesma credencial a pessoas diferentes. |
| RNF-03 | Rastreabilidade | As tentativas de acesso devem permanecer consultáveis no histórico de eventos. |
| RNF-04 | Privacidade | Dados pessoais exibidos e armazenados devem ser tratados de forma compatível com a finalidade do sistema. |
| RNF-05 | Desempenho | O tempo de resposta esperado deverá ser definido antes dos testes de performance, considerando ambiente e carga de referência. |

## 7. Decisões de negócio complementares

As respostas recebidas para as dúvidas iniciais foram incorporadas ao escopo:

| Tema | Decisão confirmada | Impacto para QA |
|---|---|---|
| Quantidade de credenciais por pessoa | Cada pessoa poderá possuir somente uma credencial. | Testar tentativa de associar uma segunda credencial à mesma pessoa. |
| Inativação de pessoa | A credencial será inativada automaticamente quando a pessoa for inativada. | Validar a mudança automática de status e a negação de acesso posterior. |
| Expiração de credencial | Credenciais terão data de expiração. | Testar antes, no momento e depois da expiração. |
| Tentativas simultâneas | Deve haver um tempo de espera antes de tentar novamente. | Testar tentativas repetidas dentro e após o intervalo; a duração ainda precisa ser especificada. |
| Perfis de usuário | Administrador terá acesso a todas as funcionalidades; Operador terá acesso mais restrito. | Testar autorização e restrição por funcionalidade; a matriz detalhada de permissões ainda precisa ser definida. |

### 7.1 Regras adicionais derivadas das decisões

- Uma pessoa não pode ter mais de uma credencial associada.
- A inativação da pessoa deve inativar automaticamente sua credencial.
- Credencial expirada não deve permitir acesso.
- Uma nova tentativa de acesso deve respeitar o intervalo de espera configurado.
- O Administrador possui acesso completo às funcionalidades.
- O Operador possui acesso limitado às funcionalidades, conforme matriz de permissões a definir.

### 7.2 Pontos que ainda precisam de definição

1. Qual é o intervalo de espera entre tentativas de acesso? O intervalo é aplicado por pessoa, credencial, dispositivo ou área?
2. A data de expiração inclui o dia inteiro ou a credencial expira exatamente no horário registrado?
3. O que o sistema deve fazer quando uma credencial é inativada automaticamente: permitir reativação manual ou exigir uma nova credencial?
4. Quais ações específicas o perfil Operador pode executar? Por exemplo: consultar pessoas, cadastrar pessoas, editar dados, associar credenciais, bloquear credenciais, alterar permissões e consultar eventos.
5. Existe algum perfil além de Administrador, Operador e Consulta? A definição anterior do perfil Consulta permanece pendente de confirmação.

## 8. Pontos em aberto e decisões necessárias

Os pontos abaixo não foram especificados e precisam ser definidos antes de considerar os requisitos completos:

1. Quais campos, além dos listados, são obrigatórios no cadastro de pessoa?
2. O CPF pode ser alterado após o cadastro?
3. Uma pessoa pode possuir mais de uma credencial simultaneamente?
4. Credenciais possuem validade ou data de expiração?
5. Quais áreas estarão disponíveis e quem pode cadastrá-las?
6. O que deve acontecer com credenciais quando uma pessoa é inativada?
7. Qual fuso horário deve ser utilizado na gravação e exibição dos eventos?
8. Qual o volume esperado de pessoas, credenciais e eventos?
9. Quais campos pessoais devem ser mascarados conforme o perfil?
10. Quais operações devem ser registradas em auditoria além das tentativas de acesso?

**Tratamento para o portfólio:** os pontos em aberto serão registrados como dúvidas de requisito, e não tratados como regras confirmadas. As decisões adotadas em versões futuras do estudo de caso serão documentadas.

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
| 1.0 | Criação do escopo inicial, requisitos funcionais, critérios de aceitação e regras de negócio para o AccessControl Demo. |\n| 1.1 | Inclusão das decisões sobre quantidade de credenciais, inativação automática, expiração, intervalo entre tentativas e perfis de acesso. |
