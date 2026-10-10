# Jupiter Toys – Playwright + TypeScript

## Setup
    npm install
    npx playwright install --with-deps chromium

## Run
    npm test                # local
    npm run test:headed     # watch it run
    BASE_URL=http://other-env npm test
    npm run test:ci         # CI mode (retries, JUnit + HTML reports)

## Structure
- `pages/`      Page objects (BasePage -> HomePage, ContactPage) and NavigationBar component
- `test-data/`  Test data and expected messages
- `tests/`      Specs (business-level steps only, no selectors)
- `Jenkinsfile` Declarative pipeline using the official Playwright Docker image

## Test cases
| Tag | Spec | Description |
|-----|------|-------------|
| TC1 | tests/contact.spec.ts | Mandatory-field errors appear, then clear |
| TC2 | tests/contact.spec.ts | Valid submission shows success message |
| TC3 | tests/cart.spec.ts    | Cart prices, subtotals and total |

    npm run test:tc2:x5     # TC2 five times, retries disabled, so any flake fails the run
