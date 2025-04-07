import {test, expect} from '@playwright/test';
    
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
});

test.describe('test suite Forms Layouts', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });
    test('Locator syntax rules', async ({page}) => {
        await page.locator('#inputEmail1').click();
        page.locator(':text("Using")');
        page.locator(':text-is("Using the Grid")');
    });
    test('User facing locators', async({page}) => {
        await page.getByRole("textbox", {name: "Email"}).first().click();
        await page.getByRole('button', {name: "Sign in"}).first().click();

        await page.getByLabel('Password').first().click();
        await page.getByPlaceholder('Jane Doe').click();
        await page.getByText('Basic form').click();
        //await page.getByTestId('data-testid').click();
        await page.getByTitle('IoT Dashboard').click();
    });
    test('Locating child elements', async ({page}) => {
        await page.locator('nb-card nb-radio :text-is("Option 1")').click();
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
        await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
        await page.locator('nb-card').nth(3).getByRole('button').click();
    });
    test('Locating parent elements', async ({page}) => {
        await page.locator('nb-card', {hasText: "Block Form"}).click();
        await page.locator('nb-card', {has: page.locator('#inputEmail1')}).click();

        await page.locator('nb-card').filter({hasText: "Basic form"}).click();
        await page.locator('nb-card').filter({has: page.locator('[placeholder=Message]')}).click();

        await page.locator('nb-card')
            .filter({has: page.getByRole('checkbox')})
            .filter({hasText: "Sign in"}).click();
        await page.locator('nb-card')
            .filter({hasText: "Sign in"})
            .filter({has: page.getByRole('checkbox')})
            .getByRole('textbox', {name: "Password"}).click();

        await page.locator(':text-is("Using the Grid")').locator('..').click();
    });
    test('Reusing locators', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
        const emailField = basicForm.getByRole('textbox', {name: "Email"});

        await emailField.fill('myemail@mail.com');
        await basicForm.getByRole('textbox', {name: "Password"}).fill('password');
        await basicForm.getByRole('button').click();

        expect(emailField).toHaveValue('myemail@mail.com');
    });
    test('extracting single value', async({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
        const buttonText = await basicForm.locator('button').textContent();

        expect(buttonText).toEqual("Submit");
    });
    test('extracting all values', async({page}) => {
        const basicForm = page.locator("nb-card").filter({hasText: "Using the Grid"});
        const radioButtonsLabels = await basicForm.locator('nb-radio').allTextContents();

        expect(radioButtonsLabels).toContain("Option 2");
    });
    test('expect input value', async({page}) => {
        const basicForm = page.locator("nb-card").filter({hasText: "Basic form"});
        const emailField = basicForm.getByRole('textbox', {name: "Email"});
        await emailField.fill('corre@micorreo.com');
        const emailValue = await emailField.inputValue();

        expect(emailValue).toEqual('corre@micorreo.com');

        const placeholderValue = await emailField.getAttribute('placeholder');
        expect(placeholderValue).toEqual('Email');

    });
    
    test('assertions', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
        const buttonLocator = basicForm.locator('button');
        const text = await buttonLocator.textContent();
        //Genaral assetions
        expect(5).toBeCloseTo(5.003);
        expect(text).toEqual('Submit');

        //Locator assertions
        await expect(buttonLocator).toHaveText('Submit');

        //soft assertions
        await expect.soft(buttonLocator).toHaveText('Submit1');
        await buttonLocator.click();
    });
});

test.describe('test suite Modal & Overlays', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click();
    });
    test('navigate to Window page', async ({page}) => {
        await page.getByText('Window').click();
    });
});


