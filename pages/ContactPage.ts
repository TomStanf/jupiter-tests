import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ContactFormData } from '../test-data/contactData';

export type MandatoryField = 'forename' | 'email' | 'message';

export class ContactPage extends BasePage {
  private readonly submitButton: Locator;
  private readonly inputs: Record<MandatoryField, Locator>;
  private readonly errors: Record<MandatoryField, Locator>;
  private readonly headerAlert: Locator;
  private readonly successAlert: Locator;
  private readonly submittingModal: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole('link', { name: 'Submit' });
    this.headerAlert = page.locator('.alert.alert-error');
    this.successAlert = page.locator('.alert.alert-success');
    this.submittingModal = page.locator('.modal');
    this.inputs = {
      forename: page.locator('#forename'),
      email: page.locator('#email'),
      message: page.locator('#message'),
    };
    this.errors = {
      forename: page.locator('#forename-err'),
      email: page.locator('#email-err'),
      message: page.locator('#message-err'),
    };
  }

  async waitUntilLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/#\/contact/);
    await expect(this.submitButton).toBeVisible();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async fillMandatoryFields(data: ContactFormData): Promise<void> {
    await this.inputs.forename.fill(data.forename);
    await this.inputs.email.fill(data.email);
    await this.inputs.message.fill(data.message);
  }

  // ---- Assertions (kept on the page object so tests read as business steps) ----

  async expectHeaderErrorVisible(): Promise<void> {
    await expect(this.headerAlert).toBeVisible();
  }

  async expectFieldError(field: MandatoryField, expectedText: string): Promise<void> {
    await expect(this.errors[field]).toBeVisible();
    await expect(this.errors[field]).toHaveText(expectedText);
  }

  async expectNoFieldErrors(): Promise<void> {
    for (const field of Object.keys(this.errors) as MandatoryField[]) {
      await expect(this.errors[field]).toBeHidden();
    }
  }

  /** The app shows a "Sending Feedback" modal first; wait for it to finish. */
  async expectSuccessfulSubmission(forename: string): Promise<void> {
    await expect(this.submittingModal).toBeHidden({ timeout: 20_000 });
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toHaveText(
      `Thanks ${forename}, we appreciate your feedback.`,
    );
  }
}
