import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { expectedErrors, validContact } from '../test-data/contactData';

test.describe('Contact page', () => {
  test('TC1: mandatory field validation errors appear and clear once fields are populated', async ({ page }) => {
    // 1. From the home page go to contact page
    const homePage = new HomePage(page);
    await homePage.open();
    const contactPage = await homePage.goToContactPage();

    // 2. Click submit button
    await contactPage.clickSubmit();

    // 3. Verify error messages
    await contactPage.expectHeaderErrorVisible();
    await contactPage.expectFieldError('forename', expectedErrors.forename);
    await contactPage.expectFieldError('email', expectedErrors.email);
    await contactPage.expectFieldError('message', expectedErrors.message);

    // 4. Populate mandatory fields
    await contactPage.fillMandatoryFields(validContact);

    // 5. Validate errors are gone
    await contactPage.expectNoFieldErrors();
  });

  test('TC2: submitting valid feedback shows a success message', async ({ page }) => {
    // 1. From the home page go to contact page
    const homePage = new HomePage(page);
    await homePage.open();
    const contactPage = await homePage.goToContactPage();

    // 2. Populate mandatory fields
    await contactPage.fillMandatoryFields(validContact);

    // 3. Click submit button
    await contactPage.clickSubmit();

    // 4. Validate successful submission message
    await contactPage.expectSuccessfulSubmission(validContact.forename);
  });
});
