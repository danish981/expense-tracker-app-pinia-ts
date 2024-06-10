import {expect, test} from '@playwright/test';

test('if the page opened with right url and and title ', async ({page}) => {
  await page.goto('localhost:5173')
  await expect(page).toHaveURL('http://localhost:5173/')
  await expect(page).toHaveTitle('Expense tracker application')
})

test('if the input elements are blank when the page is opened', async ({page}) => {
  await page.goto('localhost:5173')
  await expect(page.locator('input[type="text"]').first()).toHaveValue('')
  await expect(page.locator('input[type="number"]').first()).toHaveValue('0')
})

// if the new transaction input elements accept the text and the number

// if the add transaction button is working and toast message appears correctly

// if the delete transaction button is working, and toastr message appears correctly

// ensure that if the transaction is negative, it is not greater than the balance










