# Casos de Teste — Consultas, Intervalo de Acesso, Permissões e Regressão

**Projeto:** AccessControl Demo  
**Documento:** Casos de teste complementares  
**Status geral:** Não executado  
**Referência:** Requisitos e Regras de Negócio v1.4 e Matriz de Rastreabilidade

> Os cenários deste documento complementam os casos P1 já documentados. Os resultados permanecem como **Não executado**: este material descreve o que deve ser validado, não comprova execução.

## Convenções

- **P1:** prioridade alta; fluxo crítico ou regra de negócio essencial.
- **P2:** prioridade média; consulta, validação complementar ou comportamento alternativo.
- **P3:** prioridade baixa; melhoria ou cenário de menor risco.
- Os dados pessoais utilizados devem ser fictícios e sintéticos.
- Quando o resultado depender de uma decisão ainda pendente, isso será indicado explicitamente.

---

## CT-005 — Consultar pessoas cadastradas

- **Requisitos relacionados:** RF-02
- **Regras relacionadas:** RN-01
- **Prioridade:** P2
- **Tipo:** Funcional / Positivo
- **Perfil:** Administrador e Operador
- **Pré-condições:** Existirem pessoas cadastradas no sistema, incluindo registros ativos.
- **Dados de teste:** Pessoa fictícia com nome e CPF conhecidos.
- **Passos:**
  1. Acessar o módulo de pessoas.
  2. Consultar a listagem de pessoas.
  3. Localizar a pessoa previamente cadastrada.
- **Resultado esperado:** O sistema deve apresentar a listagem de pessoas conforme os registros existentes e permitir identificar a pessoa cadastrada por seus dados disponíveis na interface.
- **Resultado:** Não executado.

## CT-006 — Pesquisar pessoa por nome e CPF

- **Requisitos relacionados:** RF-02
- **Regras relacionadas:** RN-01
- **Prioridade:** P2
- **Tipo:** Funcional / Positivo e negativo
- **Perfil:** Administrador e Operador
- **Pré-condições:** Existirem pessoas cadastradas com dados conhecidos.
- **Dados de teste:** Nome completo, trecho do nome e CPF sintético.
- **Passos:**
  1. Acessar a consulta de pessoas.
  2. Pesquisar pelo nome completo de uma pessoa existente.
  3. Verificar os resultados.
  4. Limpar a pesquisa e pesquisar por um trecho do nome.
  5. Limpar a pesquisa e pesquisar pelo CPF.
  6. Informar um nome ou CPF sem correspondência.
- **Resultado esperado:** Para pesquisas com correspondência, o sistema deve apresentar os registros compatíveis com o critério informado. Para pesquisa sem correspondência, deve apresentar estado vazio ou mensagem informativa, sem exibir registros indevidos.
- **Resultado:** Não executado.
- **Observação:** Confirmar se a pesquisa por nome aceita correspondência parcial e se a pesquisa por CPF exige valor completo. Esses detalhes não estão definidos nos requisitos atuais.

## CT-007 — Editar dados de pessoa cadastrada

- **Requisitos relacionados:** RF-03
- **Regras relacionadas:** RN-01
- **Prioridade:** P1
- **Tipo:** Funcional / Positivo e validação
- **Perfil:** Administrador e Operador
- **Pré-condições:** Existir uma pessoa cadastrada e o usuário estar autenticado.
- **Dados de teste:** Pessoa fictícia com dados editáveis.
- **Passos:**
  1. Acessar a consulta de pessoas.
  2. Selecionar uma pessoa cadastrada.
  3. Acionar a opção de edição.
  4. Alterar um ou mais campos permitidos.
  5. Salvar as alterações.
  6. Consultar novamente a pessoa.
- **Resultado esperado:** O sistema deve salvar os dados válidos e apresentar as informações atualizadas na consulta e na visualização do cadastro.
- **Resultado:** Não executado.
- **Ponto de atenção:** A possibilidade de alteração do CPF após o cadastro ainda não foi definida. Não considerar esse campo editável ou bloqueado como comportamento aprovado até a decisão de produto.

## CT-009 — Tratar falha ao salvar cadastro ou edição de pessoa

- **Requisitos relacionados:** RF-01, RF-03
- **Prioridade:** P1
- **Tipo:** Funcional / Negativo / Tratamento de erro
- **Perfil:** Administrador e Operador
- **Pré-condições:** Usuário autenticado e formulário de cadastro ou edição disponível.
- **Passos:**
  1. Iniciar um cadastro ou edição de pessoa.
  2. Preencher os campos obrigatórios com dados válidos.
  3. Simular uma falha de comunicação ou indisponibilidade do serviço responsável pela gravação.
  4. Acionar a opção de salvar.
  5. Verificar a resposta da interface.
  6. Após restabelecer o serviço, consultar se houve gravação indevida ou duplicada.
- **Resultado esperado:** O sistema deve informar que não foi possível concluir a operação, não deve apresentar confirmação de sucesso e não deve gerar registro parcial ou duplicado. Os dados preenchidos devem ser preservados quando tecnicamente possível.
- **Resultado:** Não executado.
- **Observação:** A forma de simular a falha dependerá do ambiente de teste e dos recursos disponíveis.

---

## CT-029 — Registrar evento de acesso autorizado

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** regras de autorização e registro de eventos
- **Prioridade:** P1
- **Tipo:** Integração / Positivo
- **Perfil:** Fluxo de acesso
- **Pré-condições:**
  - Existir pessoa ativa com credencial ativa e dentro da validade.
  - A credencial possuir permissão para a área testada.
  - Não existir intervalo de bloqueio de 10 segundos em andamento para a credencial.
- **Passos:**
  1. Realizar uma tentativa de acesso com a credencial válida na área permitida.
  2. Aguardar a conclusão do processamento.
  3. Acessar o módulo de consulta de eventos.
  4. Localizar o evento gerado.
- **Resultado esperado:** O acesso deve ser autorizado e o sistema deve registrar um evento correspondente à tentativa, com os dados disponíveis para auditoria e consulta.
- **Resultado:** Não executado.
- **Ponto de atenção:** Confirmar os campos obrigatórios do evento e o fuso horário utilizado para gravação e exibição.

## CT-030 — Registrar evento de acesso negado

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** regras de autorização e registro de eventos
- **Prioridade:** P1
- **Tipo:** Integração / Negativo
- **Perfil:** Fluxo de acesso
- **Pré-condições:** Existir credencial ou condição de acesso que resulte em negativa, por exemplo, credencial sem permissão para a área.
- **Passos:**
  1. Realizar tentativa de acesso em uma área não permitida para a credencial.
  2. Aguardar a conclusão do processamento.
  3. Acessar a consulta de eventos.
  4. Localizar a tentativa realizada.
- **Resultado esperado:** O acesso deve ser negado e a tentativa deve ser registrada como evento com resultado correspondente à negativa.
- **Resultado:** Não executado.

## CT-031 — Permitir nova tentativa após o intervalo de 10 segundos

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** RN do intervalo mínimo entre tentativas
- **Prioridade:** P1
- **Tipo:** Funcional / Positivo / Limite temporal
- **Perfil:** Fluxo de acesso
- **Pré-condições:** Credencial ativa e apta a acessar a área. Uma tentativa anterior já foi processada e concluída.
- **Passos:**
  1. Realizar uma tentativa de acesso com a credencial.
  2. Aguardar a conclusão do processamento.
  3. Aguardar o intervalo mínimo de 10 segundos.
  4. Realizar nova tentativa com a mesma credencial.
- **Resultado esperado:** Após o término do intervalo de 10 segundos, o sistema deve permitir que uma nova tentativa seja processada, respeitando as demais regras de autorização.
- **Resultado:** Não executado.
- **Ponto de atenção:** A regra sobre permitir a tentativa exatamente no instante em que se completam 10 segundos ainda precisa ser confirmada. Executar também um teste de fronteira após essa definição.

## CT-032 — Recusar tentativa realizada antes do término do intervalo de 10 segundos

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** RN do intervalo mínimo entre tentativas
- **Prioridade:** P1
- **Tipo:** Funcional / Negativo / Limite temporal
- **Perfil:** Fluxo de acesso
- **Pré-condições:** Credencial ativa e apta. Uma tentativa anterior com a mesma credencial foi concluída há menos de 10 segundos.
- **Passos:**
  1. Realizar uma tentativa de acesso com a credencial.
  2. Aguardar a conclusão do processamento.
  3. Antes de completar 10 segundos, realizar uma nova tentativa com a mesma credencial.
  4. Verificar a resposta do sistema.
- **Resultado esperado:** A nova tentativa deve ser recusada devido ao intervalo mínimo, sem ser tratada como uma nova autorização de acesso. O sistema deve apresentar orientação para aguardar.
- **Resultado:** Não executado.
- **Ponto de atenção:** O texto exato da mensagem ainda não foi definido. Também está pendente confirmar se a tentativa recusada pelo intervalo deve gerar um novo evento no histórico.

## CT-033 — Iniciar intervalo de 10 segundos após tentativa negada

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** RN do intervalo mínimo entre tentativas
- **Prioridade:** P1
- **Tipo:** Funcional / Negativo / Regra de negócio
- **Perfil:** Fluxo de acesso
- **Pré-condições:** Existir credencial ativa que resulte em acesso negado, por exemplo, por ausência de permissão para a área.
- **Passos:**
  1. Realizar uma tentativa de acesso que resulte em negativa.
  2. Aguardar a conclusão do processamento.
  3. Antes de completar 10 segundos, tentar novamente com a mesma credencial.
  4. Verificar a resposta do sistema.
  5. Após o intervalo, realizar nova tentativa.
- **Resultado esperado:** A tentativa negada também deve iniciar o intervalo de 10 segundos. Uma nova tentativa antes do término deve ser recusada com orientação para aguardar. Após o intervalo, uma nova tentativa deve ser processada conforme as regras de autorização.
- **Resultado:** Não executado.

## CT-034 — Garantir que o intervalo de 10 segundos seja independente por credencial

- **Requisitos relacionados:** RF-07
- **Regras relacionadas:** RN do intervalo mínimo entre tentativas
- **Prioridade:** P1
- **Tipo:** Funcional / Isolamento
- **Perfil:** Fluxo de acesso
- **Pré-condições:** Existirem duas credenciais distintas, ativas e aptas para realizar tentativas de acesso.
- **Passos:**
  1. Realizar uma tentativa com a credencial A.
  2. Aguardar a conclusão do processamento.
  3. Antes de completar 10 segundos, realizar uma tentativa com a credencial A.
  4. Confirmar a recusa da nova tentativa da credencial A pelo intervalo.
  5. Durante o mesmo período, realizar uma tentativa com a credencial B.
- **Resultado esperado:** O intervalo iniciado pela credencial A deve impedir nova tentativa apenas para a própria credencial. A credencial B deve ser processada normalmente, respeitando suas próprias condições de autorização.
- **Resultado:** Não executado.
- **Ponto de atenção:** Requisições simultâneas com a mesma credencial devem ser avaliadas como teste adicional de concorrência. O comportamento esperado para duas requisições recebidas praticamente ao mesmo tempo precisa ser definido tecnicamente, pois a regra atual não detalha esse caso.

---

## CT-035 — Consultar eventos de acesso

- **Requisitos relacionados:** RF-08
- **Prioridade:** P2
- **Tipo:** Funcional / Positivo
- **Perfil:** Administrador e Operador
- **Pré-condições:** Existirem eventos de acesso autorizados e negados registrados.
- **Passos:**
  1. Acessar o módulo de eventos.
  2. Consultar a listagem sem aplicar filtros.
  3. Verificar os registros apresentados.
- **Resultado esperado:** O sistema deve apresentar os eventos registrados, com informações suficientes para identificar as tentativas e seus resultados, conforme os campos definidos para a funcionalidade.
- **Resultado:** Não executado.
- **Ponto de atenção:** Confirmar quais campos devem ser exibidos na listagem e quais dados pessoais precisam ser mascarados.

## CT-036 — Filtrar eventos por critérios disponíveis

- **Requisitos relacionados:** RF-08
- **Prioridade:** P2
- **Tipo:** Funcional / Positivo
- **Perfil:** Administrador e Operador
- **Pré-condições:** Existirem eventos variados, associados a pessoas, áreas, datas e resultados diferentes.
- **Passos:**
  1. Acessar o módulo de eventos.
  2. Aplicar filtro por pessoa.
  3. Verificar os resultados.
  4. Limpar o filtro e aplicar filtro por área.
  5. Limpar o filtro e aplicar filtro por período.
  6. Limpar o filtro e aplicar filtro por resultado do acesso.
  7. Combinar dois ou mais filtros, caso a interface permita.
- **Resultado esperado:** A listagem deve apresentar somente eventos compatíveis com os filtros aplicados. Quando houver combinação de filtros, os resultados devem respeitar todos os critérios selecionados.
- **Resultado:** Não executado.
- **Ponto de atenção:** Confirmar quais filtros serão efetivamente disponibilizados e se a combinação entre eles será permitida.

## CT-037 — Exibir estado vazio na consulta de eventos

- **Requisitos relacionados:** RF-08
- **Prioridade:** P2
- **Tipo:** Funcional / Negativo
- **Perfil:** Administrador e Operador
- **Pré-condições:** A consulta de eventos estar disponível.
- **Passos:**
  1. Acessar o módulo de eventos.
  2. Aplicar um filtro para o qual não existam registros.
  3. Verificar o resultado da consulta.
  4. Remover os filtros.
- **Resultado esperado:** Quando não houver eventos compatíveis com os critérios informados, o sistema deve apresentar estado vazio ou mensagem informativa, sem exibir dados que não correspondam à pesquisa. Ao remover os filtros, a consulta deve voltar a apresentar os registros disponíveis.
- **Resultado:** Não executado.

## CT-038 — Validar permissões do perfil Operador

- **Requisitos relacionados:** RF-01, RF-02, RF-03, RF-04, RF-05, RF-06, RF-08
- **Regras relacionadas:** RN de controle de acesso por perfil
- **Prioridade:** P1
- **Tipo:** Segurança / Autorização / Regressão
- **Perfil:** Operador
- **Pré-condições:** Usuário autenticado com perfil Operador.
- **Passos:**
  1. Acessar a consulta de pessoas.
  2. Consultar os registros disponíveis.
  3. Cadastrar uma pessoa com dados válidos.
  4. Editar uma pessoa cadastrada.
  5. Acessar a consulta de credenciais.
  6. Tentar associar uma credencial a uma pessoa.
  7. Tentar bloquear, desbloquear ou reativar uma credencial.
  8. Tentar alterar permissões por área.
  9. Acessar a consulta de eventos.
  10. Tentar acessar a funcionalidade de gerenciamento de usuários do sistema.
- **Resultado esperado:**
  - O Operador deve conseguir consultar pessoas, consultar credenciais e consultar eventos.
  - O Operador deve conseguir cadastrar e editar pessoas.
  - O Operador não deve conseguir associar, bloquear, desbloquear ou reativar credenciais.
  - O Operador não deve conseguir alterar permissões por área.
  - O Operador não deve conseguir gerenciar usuários do sistema.
  - As operações não permitidas devem estar indisponíveis na interface e também protegidas no serviço/API, quando aplicável.
- **Resultado:** Não executado.
- **Ponto de atenção:** Validar autorização no backend, não apenas a ocultação de botões ou menus na interface.

## CT-039 — Executar regressão dos fluxos críticos de pessoas e credenciais

- **Requisitos relacionados:** RF-01 a RF-08
- **Regras relacionadas:** RN-01 a RN-12
- **Prioridade:** P1
- **Tipo:** Regressão / End-to-End
- **Perfil:** Administrador e Operador, conforme permissões definidas
- **Pré-condições:** Ambiente estável, dados de teste preparados e funcionalidades críticas disponíveis.
- **Passos:**
  1. Autenticar como Administrador.
  2. Cadastrar uma pessoa com dados válidos.
  3. Consultar e editar os dados da pessoa.
  4. Associar uma credencial à pessoa.
  5. Configurar permissão para uma área.
  6. Realizar tentativa de acesso autorizada.
  7. Consultar o evento registrado.
  8. Realizar tentativa de acesso negada em área não permitida.
  9. Validar o intervalo de 10 segundos para a credencial.
  10. Inativar a pessoa.
  11. Consultar a pessoa e a credencial para validar a atualização dos respectivos status.
  12. Autenticar como Operador e validar as operações permitidas e bloqueadas descritas no CT-038.
- **Resultado esperado:** Os fluxos devem funcionar de forma integrada, respeitando as regras de negócio, os estados da pessoa e da credencial, o controle de permissões e o registro de eventos. A execução de uma funcionalidade não deve causar regressão nas demais.
- **Resultado:** Não executado.
- **Observação:** A regressão deve ser executada novamente após alterações relevantes em cadastro, credenciais, autorização, eventos ou controle de acesso por perfil.

---

## Pendências que impactam a execução ou a aprovação dos cenários

| ID | Definição necessária | Casos impactados |
|---|---|---|
| GAP-01 | Definir se a busca por nome aceita correspondência parcial e o formato da busca por CPF | CT-006 |
| GAP-02 | Definir se CPF pode ser alterado após o cadastro | CT-007 |
| GAP-03 | Definir campos e formato obrigatórios do evento de acesso | CT-029, CT-030, CT-035 |
| GAP-04 | Definir fuso horário de gravação e exibição dos eventos | CT-029, CT-030, CT-035, CT-036 |
| GAP-05 | Definir texto exato da mensagem apresentada durante o intervalo de 10 segundos | CT-032, CT-033 |
| GAP-06 | Definir se uma tentativa recusada durante o intervalo gera evento no histórico | CT-032, CT-034, CT-035 |
| GAP-07 | Definir o comportamento no instante exato em que se completam 10 segundos | CT-031, CT-032 |
| GAP-08 | Definir comportamento para requisições simultâneas com a mesma credencial | CT-034 |
| GAP-09 | Confirmar filtros disponíveis na consulta de eventos e possibilidade de combiná-los | CT-036 |
| GAP-10 | Definir campos exibidos e regras de mascaramento na consulta de eventos | CT-035 |
| GAP-11 | Confirmar que as permissões do Operador serão protegidas também no backend/API | CT-038 |

## Estratégia sugerida de execução

1. Executar primeiro os cenários P1 em ambiente controlado.
2. Executar cenários de consulta e filtros após preparar massa de dados suficiente.
3. Executar testes de limite temporal com medição do instante de conclusão do processamento.
4. Validar permissões tanto pela interface quanto pelas requisições aos serviços.
5. Executar CT-039 após a conclusão dos testes individuais.
6. Registrar evidências, resultado real, ambiente, versão e defeitos encontrados. Atualizar o status de cada caso somente após execução.

## Histórico

| Versão | Alteração |
|---|---|
| 1.0 | Criação dos casos complementares CT-005 a CT-039 e registro das pendências de definição. |
