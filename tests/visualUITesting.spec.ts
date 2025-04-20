import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Visual testing - radio buttons @visualtest', async({page}) => {
    const formLocator = page.locator('nb-card', {hasText: 'Using the Grid'});
    const radioButton1 = formLocator.getByLabel('Option 1');
    const radioButton2 = formLocator.getByRole('radio', {name: 'Option 2'});

    await radioButton1.check({force: true});
    
    await expect(formLocator).toHaveScreenshot({maxDiffPixels: 5});
});