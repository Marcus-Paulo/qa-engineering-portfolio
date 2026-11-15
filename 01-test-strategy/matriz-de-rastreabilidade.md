# AccessControl Demo — Matriz de Rastreabilidade

> Artefato de portfólio para o produto fictício AccessControl Demo. Os cenários abaixo são propostas de cobertura derivadas dos requisitos e regras de negócio documentados. Não representam evidências de execução.

## 1. Objetivo

Relacionar requisitos funcionais (RF) e regras de negócio (RN) aos cenários de teste planejados, permitindo identificar cobertura, prioridade e tipo de validação.

## 2. Critérios de priorização

| Prioridade | Critério |
|---|---|
| P1 — Alta | Risco direto à segurança, autorização de acesso, integridade de credenciais ou operação essencial. |
| P2 — Média | Funcionalidade importante, consulta, manutenção de dados ou validação de comportamento. |
| P3 — Baixa | Comportamentos complementares de menor impacto operacional. |

## 3. Matriz de rastreabilidade

| ID do cenário | Requisito(s) relacionado(s) | Cenário / objetivo da validação | Tipo de teste | Prioridade |
|---|---|---|---|---|
| CT-001 | RF-01, RN-01 | Cadastrar pessoa com todos os dados obrigatórios válidos. | Funcional positivo | P1 |
| CT-002 | RF-01, RN-01 | Impedir cadastro com CPF em formato inválido. | Funcional negativo | P1 |
| CT-003 | RF-01, RN-01 | Impedir cadastro de pessoa com CPF já utilizado por outra pessoa ativa. | Funcional negativo / Integridade | P1 |
| CT-004 | RF-01 | Validar mensagens e comportamento ao tentar salvar cadastro sem campo obrigatório. | Funcional negativo | P2 |
| CT-005 | RF-02 | Consultar pessoa existente por nome e por CPF. | Funcional positivo | P2 |
| CT-006 | RF-02 | Exibir retorno informativo quando a consulta não encontrar registros. | Funcional alternativo | P3 |
| CT-007 | RF-03, RN-01 | Editar dados de pessoa e persistir as alterações sem duplicar CPF. | Funcional positivo | P2 |
| CT-008 | RF-03, RN-01 | Impedir alteração para CPF já utilizado por outra pessoa ativa. | Funcional negativo / Integridade | P1 |
| CT-009 | RF-03 | Preservar os dados anteriores quando ocorrer falha ao salvar a edição. | Funcional negativo / Integridade | P1 |
| CT-010 | RF-04, RN-02, RN-03 | Administrador associa uma credencial disponível a uma pessoa ativa sem credencial associada. | Funcional positivo | P1 |
| CT-011 | RF-04, RN-02 | Impedir associação de credencial a pessoa inativa. | Funcional negativo | P1 |
| CT-012 | RF-04, RN-03 | Impedir associação de uma segunda credencial à mesma pessoa enquanto a primeira estiver associada. | Funcional negativo / Integridade | P1 |
| CT-013 | RF-04, RN-03 | Impedir associação de credencial que já esteja associada a outra pessoa. | Funcional negativo / Integridade | P1 |
| CT-014 | RF-04, RN-09 | Impedir que Operador associe credencial, inclusive por tentativa direta de acesso à operação. | Segurança / Autorização | P1 |
| CT-015 | RF-05, RN-04 | Administrador bloqueia credencial e o sistema impede sua utilização para acesso. | Funcional positivo + validação de regra | P1 |
| CT-016 | RF-05, RN-04, RN-10 | Administrador desbloqueia credencial bloqueada e ela volta a ser elegível para acesso se as demais condições forem atendidas. | Funcional positivo / Regressão | P1 |
| CT-017 | RF-05, RN-09 | Impedir Operador de bloquear, desbloquear ou reativar credencial. | Segurança / Autorização | P1 |
| CT-018 | RF-05, RN-11 | Administrador reativa credencial expirada informando nova data de expiração futura. | Funcional positivo | P1 |
| CT-019 | RF-05, RN-11 | Impedir reativação de credencial expirada quando a nova data de expiração não for informada. | Funcional negativo | P1 |
| CT-020 | RF-05, RN-11 | Impedir reativação com data de expiração que não seja futura. | Funcional negativo | P1 |
| CT-021 | RF-04, RF-05, RN-03, RN-04 | Permitir associar uma nova credencial à pessoa depois que a credencial anterior estiver inativada, mantendo somente uma credencial associada por vez. | Funcional / Integridade | P1 |
| CT-022 | RF-06, RN-06, RN-09 | Administrador concede e remove permissão de acesso a uma área. | Funcional positivo | P1 |
| CT-023 | RF-06, RN-09 | Impedir Operador de alterar permissões por área. | Segurança / Autorização | P1 |
| CT-024 | RF-07, RN-05, RN-06 | Autorizar acesso quando pessoa e credencial estiverem ativas, credencial válida e desbloqueada e houver permissão para a área. | Funcional positivo | P1 |
| CT-025 | RF-07, RN-05 | Negar acesso quando a pessoa estiver inativa, mesmo que a credencial e a permissão de área estejam válidas. | Funcional negativo | P1 |
| CT-026 | RF-07, RN-04, RN-06 | Negar acesso com credencial bloqueada ou inativada. | Funcional negativo | P1 |
| CT-027 | RF-07, RN-06, RN-11 | Negar acesso com credencial após a data de expiração e validar sua inativação automática. | Funcional negativo / Limite | P1 |
| CT-028 | RF-07, RN-06 | Negar acesso quando a pessoa não possuir permissão para a área solicitada. | Funcional negativo | P1 |
| CT-029 | RF-07, RN-07 | Registrar evento para tentativa de acesso autorizada. | Funcional positivo / Auditoria | P1 |
| CT-030 | RF-07, RN-07 | Registrar evento para tentativa de acesso negada por pessoa inativa, credencial inválida ou ausência de permissão. | Funcional negativo / Auditoria | P1 |
| CT-031 | RF-07, RN-12 | Permitir nova tentativa com a mesma credencial após o término do intervalo de 10 segundos contado da conclusão do processamento anterior. | Funcional / Limite temporal | P1 |
| CT-032 | RF-07, RN-12 | Recusar nova tentativa com a mesma credencial antes do término dos 10 segundos e apresentar mensagem orientando a aguardar. | Funcional negativo / Limite temporal | P1 |
| CT-033 | RF-07, RN-12 | Confirmar que tentativa negada também inicia o intervalo de 10 segundos para a mesma credencial. | Funcional / Limite temporal | P1 |
| CT-034 | RF-07, RN-12 | Confirmar que o intervalo de uma credencial não bloqueia indevidamente tentativas realizadas com outra credencial. | Funcional / Isolamento | P1 |
| CT-035 | RF-08, RN-08 | Consultar eventos por pessoa, área, período e resultado, individualmente e em combinação. | Funcional positivo | P2 |
| CT-036 | RF-08 | Exibir mensagem informativa quando não houver eventos compatíveis com os filtros. | Funcional alternativo | P3 |
| CT-037 | RF-08 | Apresentar eventos em ordem decrescente de data/hora por padrão. | Funcional | P2 |
| CT-038 | RF-02, RF-04, RF-05, RF-06, RF-08, RN-08, RN-09 | Validar que Operador consegue consultar pessoas, credenciais e eventos, cadastrar e editar pessoas, mas não executa operações administrativas restritas. | Segurança / Autorização | P1 |
| CT-039 | RF-01 a RF-08, RN-01 a RN-12 | Revalidar os fluxos críticos de cadastro, credencial, autorização e consulta após alterações nos módulos relacionados. | Regressão | P1 |

## 4. Cobertura por requisito

| Requisito | Cenários relacionados | Cobertura planejada |
|---|---|---|
| RF-01 — Cadastro de pessoas | CT-001 a CT-004 | Positivo, negativo e validação de obrigatoriedade/duplicidade |
| RF-02 — Consulta de pessoas | CT-005, CT-006, CT-038 | Consulta positiva, sem resultados e autorização por perfil |
| RF-03 — Edição de pessoas | CT-007 a CT-009 | Persistência, duplicidade e falha de gravação |
| RF-04 — Associação de credencial | CT-010 a CT-014, CT-021 | Associação válida, restrições de pessoa/credencial, perfil e substituição |
| RF-05 — Bloqueio, desbloqueio e reativação | CT-015 a CT-021 | Ciclo de status, expiração, reativação e autorização |
| RF-06 — Permissões por área | CT-022, CT-023, CT-024, CT-028 | Concessão, remoção, restrição por perfil e efeito na autorização |
| RF-07 — Registro de evento de acesso | CT-024 a CT-034 | Autorização, negação, auditoria e intervalo entre tentativas |
| RF-08 — Consulta de eventos | CT-035 a CT-038 | Filtros, ausência de resultados, ordenação e perfil |

## 5. Cobertura por regra de negócio

| Regra | Cenários relacionados |
|---|---|
| RN-01 — CPF único | CT-001, CT-002, CT-003, CT-007, CT-008 |
| RN-02 — Pessoa ativa para receber credencial | CT-010, CT-011 |
| RN-03 — Uma credencial por pessoa e credencial não compartilhada | CT-012, CT-013, CT-021 |
| RN-04 — Credencial bloqueada/inativada não autoriza | CT-015, CT-016, CT-026 |
| RN-05 — Inativação da pessoa inativa a credencial | CT-025 |
| RN-06 — Condições para autorização | CT-024 a CT-028 |
| RN-07 — Registro de tentativas | CT-029, CT-030 |
| RN-08 — Consulta respeita perfil | CT-035, CT-038 |
| RN-09 — Restrições do Operador | CT-014, CT-017, CT-023, CT-038 |
| RN-10 — Alterações refletem nas próximas tentativas | CT-016, CT-022, CT-024 a CT-028 |
| RN-11 — Expiração e reativação | CT-018 a CT-020, CT-027 |
| RN-12 — Intervalo de 10 segundos | CT-031 a CT-034 |

## 6. Lacunas e pontos de atenção identificados

A matriz evidencia cobertura planejada, mas alguns detalhes ainda precisam ser especificados para que os casos detalhados tenham resultados esperados totalmente objetivos:

1. **Texto da mensagem de espera:** o requisito determina que deve existir uma mensagem, mas o conteúdo exato ainda não foi definido.
2. **Limite exato dos 10 segundos:** confirmar se uma nova tentativa é permitida exatamente ao completar 10 segundos ou somente após esse instante.
3. **Expiração às 23h59:** definir a precisão do limite (por exemplo, até 23h59min59s) e o fuso horário utilizado.
4. **Reativação:** confirmar se a nova data informada deve obrigatoriamente ser posterior à data/hora atual. A matriz considera essa interpretação como validação proposta.
5. **Nova credencial:** confirmar se a credencial anterior precisa estar inativada antes da associação de uma nova. A matriz considera que sim.
6. **Registro durante o intervalo:** esclarecer se uma tentativa recusada por estar dentro do intervalo também gera evento no histórico. A regra atual confirma que tentativas de acesso autorizadas e negadas geram eventos, mas não detalha esse caso de bloqueio temporal.
7. **CPF duplicado:** o requisito atual menciona duplicidade entre cadastros ativos; avaliar se um CPF já existente em cadastro inativo também deve impedir novo cadastro.

Esses itens devem permanecer como pontos de esclarecimento, não como comportamento confirmado.

## 7. Estratégia de execução sugerida

1. Executar primeiro os cenários P1 relacionados a credenciais, autorização e permissões.
2. Executar cenários P2 de cadastro, edição e consulta.
3. Executar cenários P3 de mensagens e estados sem resultados.
4. Realizar regressão após correções ou alterações nas regras de negócio.
5. Registrar evidências e resultados reais somente após executar os testes em um ambiente disponível.

## 8. Critério de conclusão da análise

A análise de rastreabilidade estará pronta para servir de base à especificação detalhada quando:
- Cada RF e RN aplicável estiver relacionado a pelo menos um cenário;
- Cenários críticos de segurança e integridade estiverem identificados;
- Lacunas e premissas estiverem registradas;
- Prioridades estiverem atribuídas e justificadas.

**Observação:** esta matriz representa cobertura planejada, não execução concluída. Nenhum cenário deve ser marcado como aprovado ou reprovado sem evidência de execução.
