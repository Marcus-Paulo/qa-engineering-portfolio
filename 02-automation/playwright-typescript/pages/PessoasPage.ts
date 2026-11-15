import { expect, Locator, Page } from '@playwright/test';

export class PessoasPage {
  readonly newPersonButton: Locator;
  readonly nameInput: Locator;
  readonly cpfInput: Locator;
  readonly emailInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly validationMessage: Locator;
  readonly searchInput: Locator;

  constructor(private readonly page: Page) {
    this.newPersonButton = page.getByTestId('person-new');
    this.nameInput = page.getByTestId('person-name');
    this.cpfInput = page.getByTestId('person-cpf');
    this.emailInput = page.getByTestId('person-email');
    this.saveButton = page.getByTestId('person-save');
    this.successMessage = page.getByTestId('person-success-message');
    this.validationMessage = page.getByTestId('person-validation-message');
    this.searchInput = page.getByRole('textbox', {
      name: 'Pesquisar por nome ou CPF',
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/pessoas');
  }

  async startNewPerson(): Promise<void> {
    await this.newPersonButton.click();
  }

  async fillForm(data: {
    name: string;
    cpf: string;
    email: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.cpfInput.fill(data.cpf);
    await this.emailInput.fill(data.email);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async searchFor(value: string): Promise<void> {
    await this.searchInput.fill(value);
  }

  personRow(cpf: string): Locator {
    return this.page.getByTestId(`person-row-${cpf}`);
  }

  async editPerson(cpf: string): Promise<void> {
    await this.personRow(cpf).getByRole('button', {
      name: 'Editar',
    }).click();
  }

  async expectPersonInList(cpf: string): Promise<void> {
    await expect(this.personRow(cpf)).toBeVisible();
  }

  async expectPersonEmail(cpf: string, email: string): Promise<void> {
    await expect(this.personRow(cpf)).toContainText(email);
  }
}
