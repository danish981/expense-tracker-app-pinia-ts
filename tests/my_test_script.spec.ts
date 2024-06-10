import {expect, test} from '@playwright/test';

test('if the page opened with right url and and title ', async ({page}) => {
    await page.goto('localhost:5173')
    await expect(page).toHaveURL('http://localhost:5173/')
    await expect(page).toHaveTitle('Expense tracker application')
})

test('If the needed elements are there which we are going to interact to', async ({page}) => {
    await page.goto('localhost:5173')
    await expect(page.locator('input[type="text"]').first()).toHaveValue('')
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')
    await expect(page.locator('input[type="submit"]').first()).toHaveText('Add transaction')
})

// can we pass the text to the number element, if the right data is being passed to the save method
test.skip('can we pass the text to the number element', async ({page}) => {
    await page.goto('localhost:5173')

    await page.getByRole('button', {name: 'Add transaction'}).click()

    // when the button is clicked, if the
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')

});

test.skip('after the transaction completed, both the fields turn their original state', async ({page}) => {
    await page.goto('localhost:5173')
    await page.getByRole('button', {name: 'Add transaction'}).click()
    await page.locator('input[type="text"]').first().fill('test')
    await page.locator('input[type="number"]').first().fill('100')
    await page.getByRole('button', {name: 'Add transaction'}).click()

    // todo : check success or warning toast appears

    await expect(page.locator('input[type="text"]').first()).toHaveValue('')
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')
})

// if the new transaction input elements accept the text and the number

// if the add transaction button is working and toast message appears correctly

// if the delete transaction button is working, and toastr message appears correctly

// ensure that if the transaction is negative, it is not greater than the balance










