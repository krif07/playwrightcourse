import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://www.uitestingplayground.com/ajax');
});

test('auto waiting', async({page}) => {
    const buttonAjax = page.locator('#ajaxButton');
    const messageLocator = page.locator('.bg-success');
    await buttonAjax.click();

    await messageLocator.waitFor({state: "attached"});
    const messateArray = await messageLocator.allTextContents();
    const messateText = await messageLocator.textContent();

    //expect.soft(messateArray).toEqual('Data loaded with AJAX get request.');
    expect(messateText).toEqual('Data loaded with AJAX get request.');
    expect(messageLocator).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
});

test('alternative waits', async({page}) => {
    const buttonAjax = page.locator('#ajaxButton');
    const messageLocator = page.locator('.bg-success');
    await buttonAjax.click();

    //wait for selector ***
    await page.waitForSelector('.bg-success');

    const messateArray = await messageLocator.allTextContents();
    expect(messateArray).toContain('Data loaded with AJAX get request.');
});

test('alternative waits - response', async({page}) => {
    const buttonAjax = page.locator('#ajaxButton');
    const messageLocator = page.locator('.bg-success');
    await buttonAjax.click();

    //wait for particular response
    await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata');

    const messateArray = await messageLocator.allTextContents();
    expect(messateArray).toContain('Data loaded with AJAX get request.');
});

test('alternative waits - all network call to be completed', async({page}) => {
    const buttonAjax = page.locator('#ajaxButton');
    const messageLocator = page.locator('.bg-success');
    await buttonAjax.click();

    //wait for particular all network call to be completed
    //NOT RECOMENDED
    await page.waitForLoadState('networkidle');

    //wait for particular time
    //NOT RECOMENDED
    //wait page.waitForTimeout(2000);
    
    const messateArray = await messageLocator.allTextContents();
    expect(messateArray).toContain('Data loaded with AJAX get request.');
});
