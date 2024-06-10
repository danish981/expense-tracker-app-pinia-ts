import {expect, Page, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('localhost:5173')
    await expect(page).toHaveURL('http://localhost:5173/')
    await expect(page).toHaveTitle('Expense tracker application')
});

const WRONG_VALUES = [
    '', null, "", undefined, 1 / 0, '*&^%(&^*&^^&$#%$#*&)_(*_)(_)(:"|":}{:|":>'
]

const DUMMY_LETTER_STRINGS = [
    'dummy value 1', 'dummy value 2', 'dummy value 3'
]

const DUMMY_NUMBERS = [
    400, 500, 450, 900, 120, -50, -90, -400
]

test('if the page opened with right url and and title and transactions items are not visible', async ({page}) => {
    await expect(page).toHaveURL('http://localhost:5173/')
    await expect(page).toHaveTitle('Expense tracker application')
    await expect(page.locator('li')).toHaveCount(0)
})

// if on the boot of the application, if local storage is empty, it is fetching all the items from the local storage

test('if the submit button and input fields are properly rendered with their attributes when the app is loaded ', async ({page}) => {
    await expect(page.locator('input[type="text"]').first()).toHaveId('text')
    await expect(page.locator('input[type="text"]').first()).toBeVisible()
    await expect(page.locator('input[type="text"]').first()).toHaveValue('')

    await expect(page.locator('input[type="number"]').first()).toHaveId('amount')
    await expect(page.locator('input[type="number"]').first()).toBeVisible()
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')

    await expect(page.locator('button[type="submit"]').first()).toHaveText('Add transaction')
    await expect(page.locator('button[type="submit"]').first()).toHaveClass('btn')
})

// can we pass the text to the number element, if the right data is being passed to the save method
test.skip('if the app is working with the wrong values', async ({page}) => {

    // todo : check with nulls, undefined and empty strings

    await page.getByRole('button', {name: 'Add transaction'}).click()
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')

});

test('after the transaction completed, both the fields turn their original state', async ({page}) => {
    await page.getByRole('button', {name: 'Add transaction'}).click()
    await page.locator('input[type="text"]').first().fill('test')
    await page.locator('input[type="number"]').first().fill('100')
    await page.getByRole('button', {name: 'Add transaction'}).click()

    // todo : check success or warning toast appears on the top right corner

    await expect(page.locator('input[type="text"]').first()).toHaveValue('')
    await expect(page.locator('input[type="number"]').first()).toHaveValue('0')

   //  await checkNumberOfTransactionItemsInLocalStorage(page, 3);

})

// if the new transaction input elements accept the text and the number

// if the add transaction button is working and toast message appears correctly

// if the delete transaction button is working, and toastr message appears correctly

// ensure that if the transaction is negative, it is not greater than the balance

// when there is no transaction item, then the balance must be zero, 0.00

async function checkNumberOfTransactionItemsInLocalStorage(page: Page, expected: number) {
    return await page.waitForFunction(e => {
        return JSON.parse(localStorage['transactions']).length === e;
    }, expected);
}


async function ifTheNumberOfTransactionsInLocalStorageAreGreaterThanFiveHundred(): Promise<boolean> {
    return JSON.parse(localStorage['transactions']).length > 500
}



