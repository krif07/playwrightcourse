import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
});

test('Drag & Drop with iFrames', async({page}) => {
    
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

    const photo2 = frame.locator('li', {hasText: 'High Tatras 2'});
    const photo4 = frame.locator('li', {hasText: 'High Tatras 4'});
    const trash = frame.locator('#trash');

    await photo2.dragTo(trash);

//more control
    await photo4.hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up();

    const photoInTrash = trash.locator('li h5');
    await expect(photoInTrash).toHaveText(['High Tatras 2', 'High Tatras 4']);
});

