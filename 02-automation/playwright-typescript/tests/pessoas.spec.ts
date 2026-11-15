import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PessoasPage } from '../pages/PessoasPage';
import { uniquePersonData } from '../utils/testData';

test.describe('Cadastro e consulta de pessoas', () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.E2E_USER;
    const password = process.env.E2E_PASSWORD;

    test.skip(!username || !password, 'Defina E2E_USER e E2E_PASSWORD no arquivo .env.');

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.signIn(username!, password!);
    await loginPage.expectSuccessfulLogin();
  });

  test('deve cadastrar uma pessoa com dados válidos', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await expect(pessoasPage.successMessage).toBeVisible();
    await pessoasPage.expectPersonInList(person.cpf);
  });

  test('deve impedir o envio do cadastro sem preencher os campos obrigatórios', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.save();

    // O navegador bloqueia o submit nativamente e foca o primeiro campo obrigatório inválido.
    await expect(pessoasPage.nameInput).toBeFocused();
    await expect(pessoasPage.nameInput).toHaveAttribute('required', '');
    await expect(pessoasPage.cpfInput).toHaveAttribute('required', '');
    await expect(pessoasPage.emailInput).toHaveAttribute('required', '');
  });

  test('deve impedir o cadastro com formato de e-mail inválido', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm({
      ...person,
      email: 'email-invalido',
    });
    await pessoasPage.save();

    // A validação nativa do input type="email" deve impedir o envio do formulário.
    const hasInvalidEmailFormat = await pessoasPage.emailInput.evaluate(
      (element) => (element as HTMLInputElement).validity.typeMismatch,
    );

    expect(hasInvalidEmailFormat).toBe(true);
    await expect(pessoasPage.emailInput).toBeFocused();
    await expect(pessoasPage.personRow(person.cpf)).toHaveCount(0);
  });

  test('deve pesquisar uma pessoa pelo nome', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await pessoasPage.searchFor(person.name);
    await pessoasPage.expectPersonInList(person.cpf);
  });

  test('deve pesquisar uma pessoa pelo CPF', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await pessoasPage.searchFor(person.cpf);
    await pessoasPage.expectPersonInList(person.cpf);
  });

  test('deve editar o e-mail de uma pessoa cadastrada', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();
    const updatedEmail = `atualizado.${person.email}`;

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await pessoasPage.editPerson(person.cpf);
    await pessoasPage.emailInput.fill(updatedEmail);
    await pessoasPage.save();

    await expect(pessoasPage.successMessage).toBeVisible();
    await pessoasPage.expectPersonEmail(person.cpf, updatedEmail);
  });

  test('deve descartar alterações ao cancelar a edição de uma pessoa', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();
    const changedName = `Alterado ${person.name}`;
    const changedEmail = `alterado.${person.email}`;

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await pessoasPage.expectPersonInList(person.cpf);
    await pessoasPage.editPerson(person.cpf);

    await pessoasPage.nameInput.fill(changedName);
    await pessoasPage.emailInput.fill(changedEmail);

    // Cancelar deve fechar o formulário sem persistir as alterações realizadas.
    await page.getByRole('button', { name: 'Cancelar' }).click();

    await expect(pessoasPage.personRow(person.cpf)).toContainText(person.name);
    await expect(pessoasPage.personRow(person.cpf)).toContainText(person.email);
    await expect(pessoasPage.personRow(person.cpf)).not.toContainText(changedName);
    await expect(pessoasPage.personRow(person.cpf)).not.toContainText(changedEmail);
  });

  test('deve manter os dados da pessoa após atualizar a página', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const person = uniquePersonData();

    await pessoasPage.open();
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(person);
    await pessoasPage.save();

    await pessoasPage.expectPersonInList(person.cpf);

    await page.reload();

    await pessoasPage.expectPersonInList(person.cpf);
    await pessoasPage.expectPersonEmail(person.cpf, person.email);
  });

  test('deve impedir o cadastro de duas pessoas ativas com o mesmo CPF', async ({ page }) => {
    const pessoasPage = new PessoasPage(page);
    const firstPerson = uniquePersonData();
    const duplicatePerson = uniquePersonData();

    duplicatePerson.cpf = firstPerson.cpf;

    await pessoasPage.open();

    // Cadastra a primeira pessoa.
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(firstPerson);
    await pessoasPage.save();

    await pessoasPage.expectPersonInList(firstPerson.cpf);

    // Tenta cadastrar outra pessoa usando o CPF já associado a uma pessoa ativa.
    await pessoasPage.startNewPerson();
    await pessoasPage.fillForm(duplicatePerson);
    await pessoasPage.save();

    await expect(pessoasPage.validationMessage).toHaveText(
      'Já existe uma pessoa ativa cadastrada com este CPF.',
    );

    // A primeira pessoa deve permanecer cadastrada, sem duplicidade.
    await expect(pessoasPage.personRow(firstPerson.cpf)).toHaveCount(1);
    await pessoasPage.expectPersonEmail(firstPerson.cpf, firstPerson.email);
  });

});
