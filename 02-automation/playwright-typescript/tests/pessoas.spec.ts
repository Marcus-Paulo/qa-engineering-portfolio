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
});
