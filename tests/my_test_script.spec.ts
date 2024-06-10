import {test, expect} from '@playwright/test';

test('if the page opened with url and title', async ({page}) => {
  await page.goto('localhost:5173')
  await expect(page).toHaveURL('http://localhost:5173/')
  await expect(page).toHaveTitle('Expense tracker application')
})

// if the toastr lib is set up correctly

// if the new transaction input elements accept the text and the number

// if the add transaction button is working and toast message appears correctly

// if the delete transaction button is working, and toastr message appears correctly

// ensure that if the transaction is negative, it is not greater than the balance










