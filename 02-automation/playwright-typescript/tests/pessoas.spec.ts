import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PessoasPage } from '../pages/PessoasPage';
import { uniquePersonData } from '../utils/testData';

test.describe('Cadastro de pessoas', () => {
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
});
