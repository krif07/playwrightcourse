import {test, expect} from '@playwright/test';

test('Mobile test', async({page}, testInfo) => {
    await page.goto('/');
    if(testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    if(testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }
    const formLocator = page.locator('nb-card', {hasText: 'Using the Grid'});
    const emailLocator = formLocator.getByRole('textbox', {name: 'Email'});

    await emailLocator.fill('test@test.com');
    await emailLocator.clear();
    await emailLocator.pressSequentially('krif07@gmail.com', {delay: 100});
});