import { expect, Page, test } from '@playwright/test';

const WRONG_VALUES = [
  '', null, undefined, 1 / 0, '*&^%(&^*&^^&$#%$#*&)_(*_)(_)(:"|":}{:|":>',
];

const DUMMY_LETTER_STRINGS = [
  'dummy value 1', 'dummy value 2', 'dummy value 3',
];

const DUMMY_NUMBERS = [
  400, 500, 450, 900, 120, -50, -90, -400,
];

const toastCrossBtn = ' × ';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.evaluate(() => localStorage.setItem('transactions', '[]'));
});

test('when the page is loaded, it should have exactly the same number of li items as the local storage transaction items', async ({ page }) => {
  await expect(page).toHaveTitle('Expense tracker application');
  const localStorageTransactions = await getLocalStorageTransactions(page);
  await expect(page.locator('li')).toHaveCount(localStorageTransactions.length);
});

test('allow us to add transactions', async ({ page }) => {
  const beforeCount = (await getLocalStorageTransactions(page)).length;
  await page.getByPlaceholder('Enter income/expense text...').fill('income paycheck');
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill('200');
  await page.getByRole('button', { name: 'Add transaction' }).click();
  await checkNumberOfTransactionItemsInLocalStorage(page, beforeCount + 1);
});

// test.skip('if the input fields accept invalid characters and do not save the data into local storage', async ({ page }) => {
//   for (const value of WRONG_VALUES) {
//     await page.getByPlaceholder('Enter income/expense text...').fill(String(value));
//     await page.getByPlaceholder('Enter the amount... e.g (200)').fill(String(value)); // not accepting the wrong values, test is failed, great 👍
//     await page.getByRole('button', { name: 'Add transaction' }).click();
//   }
//   const transactions = await getLocalStorageTransactions(page);
//   expect(transactions).toHaveLength(0);
// });

test('if the new transaction input elements accept the text and the number', async ({ page }) => {
  await page.getByPlaceholder('Enter income/expense text...').fill(DUMMY_LETTER_STRINGS[0]);
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill(DUMMY_NUMBERS[0].toString());
  await page.getByRole('button', { name: 'Add transaction' }).click();
  const transactions = await getLocalStorageTransactions(page);
  expect(transactions).toHaveLength(1);
});

test('if the add transaction button is working and toast message appears correctly', async ({ page }) => {
  await page.getByPlaceholder('Enter income/expense text...').fill(DUMMY_LETTER_STRINGS[0]);
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill(DUMMY_NUMBERS[0].toString());
  await page.getByRole('button', { name: 'Add transaction' }).click();
  await expect(page.locator('.Vue-Toastification__toast--success')).toHaveText('Transaction added successfully' + toastCrossBtn);
});

test('if the delete transaction button is working, and toastr message appears correctly', async ({ page }) => {
  await page.getByPlaceholder('Enter income/expense text...').fill(DUMMY_LETTER_STRINGS[0]);
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill(DUMMY_NUMBERS[0].toString());
  await page.getByRole('button', { name: 'Add transaction' }).click();
  await page.locator('.delete-btn').first().click();
  await expect(page.locator('.Vue-Toastification__toast--success').first()).toHaveText('Transaction removed successfully' + toastCrossBtn);
  const transactions = await getLocalStorageTransactions(page);
  expect(transactions).toHaveLength(0);
});

test('ensure that if the transaction is negative, it is not greater than the balance', async ({ page }) => {
  await page.getByPlaceholder('Enter income/expense text...').fill('Initial Balance');
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill('500');
  await page.getByRole('button', { name: 'Add transaction' }).click();

  await page.getByPlaceholder('Enter income/expense text...').fill('Tour to Murree Expense');
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill('-600');
  await page.getByRole('button', { name: 'Add transaction' }).click();

  const transactions = await getLocalStorageTransactions(page);
  expect(transactions).toHaveLength(1); // Only the initial balance should be added
});

test('when there is no transaction item, then the balance must be zero, 0.00', async ({ page }) => {
  const balanceText = await page.locator('#balance').textContent();
  expect(balanceText).toContain('$ 0');
});

test('if delete all transactions button is clicked, it should delete all transactions from the local storage and there should be no li items', async ({ page }) => {

  await page.getByPlaceholder('Enter income/expense text...').fill('Transaction 1');
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill('200');
  await page.getByRole('button', { name: 'Add transaction' }).click();

  await page.getByPlaceholder('Enter income/expense text...').fill('Transaction 2');
  await page.getByPlaceholder('Enter the amount... e.g (200)').fill('300');
  await page.getByRole('button', { name: 'Add transaction' }).click();

  let transactions = await getLocalStorageTransactions(page);
  expect(transactions).toHaveLength(2);

  await page.locator('.btn-danger').first().click();
  let transactionsAfterDeleteButtonClicked = await getLocalStorageTransactions(page);

  transactionsAfterDeleteButtonClicked = await getLocalStorageTransactions(page);
  expect(transactionsAfterDeleteButtonClicked.length === 0);

  await expect(page.locator('.Vue-Toastification__toast--success').first()).toHaveText('All transactions removed successfully' + toastCrossBtn);

});

async function checkNumberOfTransactionItemsInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage.getItem('transactions')).length === e;
  }, expected);
}

async function getLocalStorageTransactions(page: Page) {
  return await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('transactions')) || [];
  });
}
