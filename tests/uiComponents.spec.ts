import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts page', ()=>{
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });
    test('input fields', async({page}) => {
        const formLocator = page.locator('nb-card', {hasText: 'Using the Grid'});
        const emailLocator = formLocator.getByRole('textbox', {name: 'Email'});

        await emailLocator.fill('test@test.com');
        await emailLocator.clear();
        await emailLocator.pressSequentially('krif07@gmail.com', {delay: 250});
        
        //Generic assertion
        const emailValue = await emailLocator.inputValue();
        expect(emailValue).toEqual('krif07@gmail.com');

        //Locator assertion
        await expect(emailLocator).toHaveValue('krif07@gmail.com');
    });
    test('radio buttons', async({page}) => {
        const formLocator = page.locator('nb-card', {hasText: 'Using the Grid'});
        const radioButton1 = formLocator.getByLabel('Option 1');
        const radioButton2 = formLocator.getByRole('radio', {name: 'Option 2'});

        await radioButton1.check({force: true});
        expect(await radioButton1.isChecked()).toBeTruthy();
        expect(await radioButton2.isChecked()).toBeFalsy();
        
        await radioButton2.check({force: true});
        await expect(radioButton1).not.toBeChecked();
        await expect(radioButton2).toBeChecked();
    });
});

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    const checkbox1 = page.getByRole('checkbox', {name: 'Hide on click'});
    const checkbox2 = page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'});
    
    await checkbox1.click({force: true});
    await expect(checkbox1).not.toBeChecked();

    checkbox1.check({force: true});
    await expect(checkbox1).toBeChecked();

    checkbox1.uncheck({force: true});
    await expect(checkbox1).not.toBeChecked();

    //if(!await checkbox2.isChecked()){
    checkbox2.check({force: true});
    //}
    await expect(checkbox2).toBeChecked();

    const allBoxes = page.getByRole('checkbox');
    for(const checkbox of await allBoxes.all()) {
        await checkbox.check({force: true});
    }
    for(const checkbox of await allBoxes.all()){
        await expect(checkbox).toBeChecked();
    }
});