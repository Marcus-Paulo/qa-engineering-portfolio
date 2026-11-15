# Casos de Teste — Cadastro, Credenciais e Autorização

> Projeto de portfólio baseado no produto fictício AccessControl Demo. Estes casos são especificações planejadas; todos permanecem como **Não executado** até serem executados em um ambiente de teste com evidências.

## 1. Objetivo

Detalhar os cenários prioritários da matriz de rastreabilidade, cobrindo cadastro de pessoas, integridade e gerenciamento de credenciais, permissões por perfil e autorização de acesso.

## 2. Convenções e dados de teste

- **Prioridade P1:** cenário de alto risco para segurança, integridade de dados ou autorização de acesso.
- **Resultado inicial:** Não executado.
- Utilizar dados fictícios e CPFs sintéticos válidos para testes. Não utilizar dados pessoais reais.
- Considerar que áreas de acesso, usuários de teste e credenciais de teste estão previamente cadastrados quando necessário.
- Quando o caso mencionar Administrador ou Operador, executar com usuário autenticado do perfil indicado.
- Para testes de expiração, controlar a data/hora do ambiente ou utilizar mecanismo de teste autorizado; não alterar o relógio de produção.

## 3. Casos de teste detalhados

### CT-001 — Cadastrar pessoa com dados obrigatórios válidos

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-01 |
| Regras relacionadas | RN-01 |
| Prioridade | P1 |
| Tipo | Funcional positivo |
| Perfil | Administrador e Operador |
| Pré-condições | Usuário autenticado; CPF sintético válido ainda não cadastrado. |
| Dados de teste | Nome completo, CPF válido, e-mail válido e status ativo. |
| Passos | 1. Acessar o cadastro de pessoas. 2. Informar os dados obrigatórios válidos. 3. Acionar Salvar. 4. Consultar a pessoa cadastrada. |
| Resultado esperado | O sistema salva o cadastro, apresenta confirmação e disponibiliza a pessoa na consulta com os dados informados. |
| Resultado | Não executado |

### CT-002 — Impedir cadastro com CPF em formato inválido

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-01 |
| Regras relacionadas | RN-01 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador e Operador |
| Pré-condições | Usuário autenticado na tela de cadastro. |
| Dados de teste | CPF com quantidade de dígitos incorreta ou dígitos verificadores inválidos. |
| Passos | 1. Acessar o cadastro. 2. Preencher os demais campos obrigatórios corretamente. 3. Informar CPF inválido. 4. Tentar salvar. |
| Resultado esperado | O sistema impede o cadastro, informa que o CPF é inválido e não cria registro. |
| Resultado | Não executado |

### CT-003 — Impedir cadastro com CPF já utilizado por pessoa ativa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-01 |
| Regras relacionadas | RN-01 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Integridade |
| Perfil | Administrador e Operador |
| Pré-condições | Existe pessoa ativa cadastrada com determinado CPF; usuário autenticado. |
| Dados de teste | Reutilizar o CPF sintético já cadastrado em outra pessoa ativa. |
| Passos | 1. Acessar o cadastro de pessoas. 2. Informar dados válidos para uma nova pessoa. 3. Informar o CPF já utilizado. 4. Tentar salvar. |
| Resultado esperado | O sistema impede a criação do novo registro, informa a duplicidade e preserva o cadastro existente sem alterações. |
| Resultado | Não executado |

### CT-004 — Impedir cadastro sem preenchimento de campo obrigatório

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-01 |
| Regras relacionadas | Critérios de aceitação de RF-01 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador e Operador |
| Pré-condições | Usuário autenticado na tela de cadastro. |
| Dados de teste | Dados válidos, deixando vazio um campo obrigatório por execução. |
| Passos | 1. Acessar o cadastro. 2. Preencher os campos obrigatórios, exceto um. 3. Tentar salvar. 4. Repetir para cada campo obrigatório. |
| Resultado esperado | O sistema impede o salvamento e identifica os campos obrigatórios não preenchidos. Nenhum cadastro incompleto é criado. |
| Resultado | Não executado |

### CT-008 — Impedir edição com CPF já utilizado por outra pessoa ativa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-03 |
| Regras relacionadas | RN-01 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Integridade |
| Perfil | Administrador e Operador |
| Pré-condições | Existem duas pessoas cadastradas com CPFs distintos; usuário autenticado. |
| Dados de teste | Alterar o CPF da Pessoa A para o CPF já utilizado pela Pessoa B, que está ativa. |
| Passos | 1. Consultar e abrir a Pessoa A para edição. 2. Alterar o CPF para o CPF da Pessoa B. 3. Salvar. 4. Consultar os dois registros. |
| Resultado esperado | O sistema impede a alteração por duplicidade. Os dados originais das duas pessoas permanecem preservados. |
| Resultado | Não executado |

### CT-010 — Administrador associa credencial disponível a pessoa ativa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04 |
| Regras relacionadas | RN-02, RN-03 |
| Prioridade | P1 |
| Tipo | Funcional positivo |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa sem credencial; credencial disponível e não associada; Administrador autenticado. |
| Dados de teste | Pessoa ativa e identificador de credencial disponível. |
| Passos | 1. Acessar o cadastro da pessoa. 2. Acionar a opção de associar credencial. 3. Informar ou selecionar a credencial disponível. 4. Confirmar a associação. 5. Consultar os dados da pessoa. |
| Resultado esperado | A credencial é associada à pessoa e a associação fica visível no cadastro. A credencial não permanece disponível para associação a outra pessoa. |
| Resultado | Não executado |

### CT-011 — Impedir associação de credencial a pessoa inativa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04 |
| Regras relacionadas | RN-02 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador |
| Pré-condições | Existe pessoa inativa sem credencial; existe credencial disponível. |
| Dados de teste | Pessoa inativa e credencial não associada. |
| Passos | 1. Localizar a pessoa inativa. 2. Tentar associar a credencial disponível. 3. Consultar o cadastro da pessoa e o status da credencial. |
| Resultado esperado | O sistema impede a associação à pessoa inativa, informa o motivo e mantém a credencial disponível. |
| Resultado | Não executado |

### CT-012 — Impedir associação de segunda credencial à mesma pessoa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04 |
| Regras relacionadas | RN-03 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Integridade |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa já possui uma credencial associada; existe uma segunda credencial disponível. |
| Dados de teste | Pessoa com credencial C1 associada e credencial C2 disponível. |
| Passos | 1. Abrir o cadastro da pessoa. 2. Tentar associar a credencial C2 sem inativar a credencial C1. 3. Consultar as associações após a tentativa. |
| Resultado esperado | O sistema impede a segunda associação enquanto a credencial anterior permanecer associada. A pessoa continua com apenas a credencial C1 associada. |
| Resultado | Não executado |

### CT-013 — Impedir associação de credencial já vinculada a outra pessoa

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04 |
| Regras relacionadas | RN-03 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Integridade |
| Perfil | Administrador |
| Pré-condições | Pessoa A possui a credencial C1; Pessoa B está ativa e sem credencial. |
| Dados de teste | Tentar associar C1 à Pessoa B. |
| Passos | 1. Abrir o cadastro da Pessoa B. 2. Tentar associar a credencial C1, já vinculada à Pessoa A. 3. Consultar os dois cadastros. |
| Resultado esperado | O sistema impede o compartilhamento da credencial. C1 permanece associada exclusivamente à Pessoa A e Pessoa B continua sem credencial. |
| Resultado | Não executado |

### CT-014 — Impedir que Operador associe credencial

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04 |
| Regras relacionadas | RN-09 |
| Prioridade | P1 |
| Tipo | Segurança / Autorização |
| Perfil | Operador |
| Pré-condições | Operador autenticado; pessoa ativa sem credencial; credencial disponível. |
| Dados de teste | Pessoa ativa e credencial disponível. |
| Passos | 1. Acessar o cadastro da pessoa como Operador. 2. Verificar se a ação de associar credencial está disponível. 3. Caso exista rota ou operação de API documentada para associação, tentar executá-la com a sessão do Operador. |
| Resultado esperado | A operação não é permitida ao Operador. A interface não deve oferecer a ação e a camada de serviço deve rejeitar tentativa não autorizada, sem alterar a associação. |
| Resultado | Não executado |

### CT-015 — Bloquear credencial e impedir autorização de acesso

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05, RF-07 |
| Regras relacionadas | RN-04, RN-06 |
| Prioridade | P1 |
| Tipo | Funcional positivo + validação de regra |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa, credencial ativa e desbloqueada, com permissão para a área; Administrador autenticado. |
| Dados de teste | Credencial associada a pessoa ativa e autorizada para a área de teste. |
| Passos | 1. Bloquear a credencial como Administrador. 2. Tentar realizar acesso com a credencial bloqueada. 3. Consultar o evento gerado e o status da credencial. |
| Resultado esperado | O bloqueio é persistido. A tentativa de acesso é negada e o evento registra o resultado correspondente. |
| Resultado | Não executado |

### CT-016 — Desbloquear credencial e permitir acesso quando as demais condições forem atendidas

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05, RF-07 |
| Regras relacionadas | RN-04, RN-06, RN-10 |
| Prioridade | P1 |
| Tipo | Funcional positivo / Regressão |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa; credencial bloqueada, mas dentro da validade; permissão vigente para a área; intervalo de 10 segundos já encerrado. |
| Dados de teste | Credencial bloqueada associada a pessoa ativa e autorizada. |
| Passos | 1. Desbloquear a credencial como Administrador. 2. Confirmar a alteração. 3. Realizar tentativa de acesso à área autorizada. |
| Resultado esperado | O desbloqueio é persistido e a tentativa é autorizada, desde que todas as demais condições de acesso estejam satisfeitas. |
| Resultado | Não executado |

### CT-017 — Impedir que Operador gerencie o status de credenciais

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05 |
| Regras relacionadas | RN-09 |
| Prioridade | P1 |
| Tipo | Segurança / Autorização |
| Perfil | Operador |
| Pré-condições | Operador autenticado; credenciais disponíveis em diferentes estados para consulta. |
| Dados de teste | Credenciais ativas, bloqueadas e expiradas, conforme preparação do ambiente. |
| Passos | 1. Acessar a consulta de credenciais como Operador. 2. Verificar ações de bloquear, desbloquear e reativar. 3. Tentar executar as operações por rota ou serviço, caso disponíveis e documentados. 4. Consultar o status das credenciais. |
| Resultado esperado | O Operador pode consultar credenciais, mas não pode bloquear, desbloquear ou reativar. Tentativas não autorizadas são rejeitadas e nenhum status é alterado. |
| Resultado | Não executado |

### CT-018 — Reativar credencial expirada informando nova data futura

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05 |
| Regras relacionadas | RN-11 |
| Prioridade | P1 |
| Tipo | Funcional positivo |
| Perfil | Administrador |
| Pré-condições | Credencial expirada e inativada automaticamente; Administrador autenticado. |
| Dados de teste | Nova data de expiração posterior à data/hora atual do ambiente. |
| Passos | 1. Localizar a credencial expirada. 2. Acionar reativação. 3. Informar nova data de expiração futura. 4. Confirmar a operação. 5. Consultar o status e a nova validade. |
| Resultado esperado | O sistema aceita a nova data, reativa a credencial e apresenta a nova validade. A credencial poderá autorizar acesso somente se as demais regras também forem atendidas. |
| Resultado | Não executado |

### CT-019 — Impedir reativação de credencial expirada sem nova data

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05 |
| Regras relacionadas | RN-11 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador |
| Pré-condições | Credencial expirada e inativada automaticamente; Administrador autenticado. |
| Dados de teste | Não informar nova data de expiração. |
| Passos | 1. Localizar a credencial expirada. 2. Acionar reativação. 3. Deixar a nova data de expiração vazia. 4. Tentar confirmar. |
| Resultado esperado | O sistema impede a reativação, informa que a nova data é obrigatória e mantém a credencial inativada. |
| Resultado | Não executado |

### CT-020 — Impedir reativação com data de expiração não futura

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05 |
| Regras relacionadas | RN-11 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Limite |
| Perfil | Administrador |
| Pré-condições | Credencial expirada e inativada; Administrador autenticado. |
| Dados de teste | Data de expiração igual à data atual ou anterior à data/hora atual. |
| Passos | 1. Acionar reativação da credencial. 2. Informar data igual à data atual ou anterior. 3. Tentar confirmar. |
| Resultado esperado | O sistema rejeita a data inválida, apresenta orientação para informar uma data futura e mantém a credencial inativada. |
| Resultado | Não executado |

### CT-021 — Associar nova credencial após inativação da anterior

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-04, RF-05 |
| Regras relacionadas | RN-03, RN-04 |
| Prioridade | P1 |
| Tipo | Funcional positivo / Integridade |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa possui uma credencial anteriormente associada, agora inativada; existe nova credencial disponível. |
| Dados de teste | Pessoa ativa, credencial anterior inativada e nova credencial disponível. |
| Passos | 1. Consultar a pessoa e confirmar que a credencial anterior está inativada. 2. Associar a nova credencial. 3. Consultar o cadastro da pessoa e as duas credenciais. |
| Resultado esperado | O sistema permite associar a nova credencial. A pessoa mantém no máximo uma credencial atualmente associada; a credencial anterior permanece inativada e não autoriza acesso. |
| Resultado | Não executado |

### CT-022 — Administrador concede e remove permissão de acesso a uma área

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-06, RF-07 |
| Regras relacionadas | RN-06, RN-09, RN-10 |
| Prioridade | P1 |
| Tipo | Funcional positivo |
| Perfil | Administrador |
| Pré-condições | Pessoa ativa com credencial ativa, desbloqueada e válida; área disponível; Administrador autenticado. |
| Dados de teste | Pessoa e credencial válidas; área A. |
| Passos | 1. Conceder à pessoa permissão para a área A. 2. Realizar tentativa de acesso à área A. 3. Remover a permissão. 4. Realizar nova tentativa após o intervalo de 10 segundos. |
| Resultado esperado | A primeira tentativa é autorizada. Após a remoção da permissão, a nova tentativa é negada. As alterações passam a valer nas próximas tentativas. |
| Resultado | Não executado |

### CT-023 — Impedir Operador de alterar permissões por área

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-06 |
| Regras relacionadas | RN-09 |
| Prioridade | P1 |
| Tipo | Segurança / Autorização |
| Perfil | Operador |
| Pré-condições | Operador autenticado; pessoa com permissões de área configuradas. |
| Dados de teste | Pessoa com ao menos uma permissão de área. |
| Passos | 1. Acessar o cadastro da pessoa como Operador. 2. Verificar se a ação de alterar permissões está disponível. 3. Tentar executar a operação por rota ou serviço, caso disponíveis e documentados. 4. Consultar as permissões da pessoa. |
| Resultado esperado | O Operador não consegue conceder ou remover permissões. A tentativa não autorizada é rejeitada e as permissões permanecem inalteradas. |
| Resultado | Não executado |

### CT-024 — Autorizar acesso quando todas as condições forem atendidas

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-07 |
| Regras relacionadas | RN-05, RN-06 |
| Prioridade | P1 |
| Tipo | Funcional positivo |
| Perfil | Não aplicável à tentativa física; preparar dados por Administrador |
| Pré-condições | Pessoa ativa; credencial associada, ativa, desbloqueada e dentro da validade; permissão concedida para a área; intervalo de 10 segundos encerrado. |
| Dados de teste | Pessoa e credencial válidas com permissão para a área A. |
| Passos | 1. Confirmar o status ativo da pessoa. 2. Confirmar que a credencial está ativa, desbloqueada e válida. 3. Confirmar permissão para a área A. 4. Realizar tentativa de acesso à área A. |
| Resultado esperado | O sistema autoriza o acesso e registra o evento com o resultado autorizado e os dados disponíveis da tentativa. |
| Resultado | Não executado |

### CT-025 — Negar acesso quando a pessoa estiver inativa e inativar sua credencial automaticamente

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-03, RF-05, RF-07 |
| Regras relacionadas | RN-05, RN-06, RN-07 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Integração entre módulos |
| Perfil | Administrador prepara os dados |
| Pré-condições | Pessoa ativa com credencial ativa e permissão para uma área; intervalo de 10 segundos encerrado. |
| Dados de teste | Pessoa com credencial associada e autorização vigente. |
| Passos | 1. Inativar a pessoa como Administrador. 2. Consultar o status da credencial associada. 3. Tentar realizar acesso com a credencial. 4. Consultar o evento de acesso. |
| Resultado esperado | A credencial é inativada automaticamente. A tentativa de acesso é negada e o evento registra a tentativa como negada. |
| Resultado | Não executado |

### CT-026 — Negar acesso com credencial bloqueada ou inativada

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05, RF-07 |
| Regras relacionadas | RN-04, RN-06 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador prepara os dados |
| Pré-condições | Pessoa ativa e com permissão para a área; credencial associada, porém bloqueada ou inativada; intervalo de 10 segundos encerrado. |
| Dados de teste | Executar uma variação com credencial bloqueada e outra com credencial inativada. |
| Passos | 1. Preparar o estado da credencial para a variação. 2. Confirmar que a pessoa permanece ativa e autorizada para a área. 3. Tentar realizar acesso. 4. Consultar o evento gerado. |
| Resultado esperado | O acesso é negado em ambas as variações, pois credenciais bloqueadas ou inativadas não autorizam acesso. A tentativa negada é registrada. |
| Resultado | Não executado |

### CT-027 — Negar acesso após expiração e validar inativação automática

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-05, RF-07 |
| Regras relacionadas | RN-06, RN-11 |
| Prioridade | P1 |
| Tipo | Funcional negativo / Limite temporal |
| Perfil | Administrador prepara os dados |
| Pré-condições | Pessoa ativa com credencial cuja data de expiração está próxima; permissão válida para a área. |
| Dados de teste | Credencial com expiração configurada para a data de teste. |
| Passos | 1. Validar que a credencial está válida antes do limite de expiração. 2. Confirmar o comportamento até 23h59 da data cadastrada, respeitando o fuso horário definido para o ambiente. 3. Avançar o ambiente de teste para depois do limite. 4. Consultar o status da credencial. 5. Tentar realizar acesso. |
| Resultado esperado | Até o limite de validade, a credencial não deve ser considerada expirada. Após o limite, deve ser inativada automaticamente e a tentativa de acesso deve ser negada. |
| Resultado | Não executado |

### CT-028 — Negar acesso quando não houver permissão para a área solicitada

| Campo | Detalhamento |
|---|---|
| Requisitos relacionados | RF-06, RF-07 |
| Regras relacionadas | RN-06 |
| Prioridade | P1 |
| Tipo | Funcional negativo |
| Perfil | Administrador prepara os dados |
| Pré-condições | Pessoa ativa; credencial ativa, desbloqueada e válida; pessoa sem permissão para a área B; intervalo de 10 segundos encerrado. |
| Dados de teste | Pessoa autorizada para área A, mas sem permissão para área B. |
| Passos | 1. Confirmar as condições válidas da pessoa e da credencial. 2. Confirmar ausência de permissão para a área B. 3. Realizar tentativa de acesso à área B. 4. Consultar o evento gerado. |
| Resultado esperado | O sistema nega o acesso à área B e registra a tentativa como negada. |
| Resultado | Não executado |

## 4. Observações de análise

1. **CPF de pessoa inativa:** a regra de unicidade atualmente documentada menciona cadastros ativos. A possibilidade de reutilizar CPF de pessoa inativa permanece pendente de decisão.
2. **Reativação e nova credencial:** os casos CT-018 a CT-021 cobrem operações diferentes: reativar a credencial anterior com nova validade e associar uma nova credencial após inativação da anterior.
3. **Expiração:** a validação do limite de 23h59 depende da definição do fuso horário e da precisão do relógio do ambiente.
4. **Segurança:** quando a arquitetura disponibilizar operações por API, as restrições do Operador devem ser verificadas também no serviço, não apenas pela ausência de botões na interface.
5. **Eventos:** CT-025 a CT-028 validam eventos de acesso negado. A tentativa recusada especificamente por estar dentro do intervalo de 10 segundos será detalhada em casos próprios da regra RN-12.
6. **Resultado:** todos os casos começam como Não executado. Não há evidência de execução ou aprovação nesta entrega.

## 5. Próxima expansão

A próxima entrega detalhará os cenários de:
- Intervalo de 10 segundos por credencial, inclusive tentativas negadas;
- Consulta e filtragem de pessoas e eventos;
- Permissões de consulta do Administrador e Operador;
- Regressão dos fluxos críticos;
- Cenários de limite e concorrência.
