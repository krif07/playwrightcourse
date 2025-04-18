import {test, expect} from '@playwright/test';

// This file will be run fully parallel
test.describe.configure({mode: 'parallel'});

test.beforeEach(async({page}) => {
    await page.goto('/');
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
test('List and dropdowns', async({page}) => {
    const selectLocator = page.locator('ngx-header nb-select');
    await selectLocator.click();

    page.getByRole('list'); // UL TAG
    page.getByRole('listitem'); // LI TAG

    //const optionList = page.getByRole('list').locator('nb-option');
    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(['Light','Dark', 'Cosmic', 'Corporate']);

    await optionList.filter({hasText: 'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    };

    for(const color in colors) {
        await selectLocator.click();
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
    }
});
test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
    await toolTipCard.getByRole('button', {name: 'TOP'}).hover();

    const tooltip = page.locator('nb-tooltip');
    await expect(tooltip).toHaveText('This is a tooltip');
});
test('dialog box tests', async({page}) => {
    test.slow();
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    await page.getByRole('table')
        .locator('tr', {hasText: 'mdo@gmail.com'})
        .locator('.nb-trash')
        .click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    });
    
    await expect(page.locator('tbody tr').first()).not.toHaveText('1MarkOtto@mdomdo@gmail.com28');
});
test('web tables', async({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //get the row by any test in this row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'});
    await targetRow.locator('.nb-edit').click();

    const emailInput = page.locator('input-editor').getByPlaceholder('E-mail');
    const ageInput = page.locator('input-editor').getByPlaceholder('Age');

    await emailInput.clear();
    await emailInput.fill('krif07@gmail.com');
    await ageInput.clear();
    await ageInput.fill('40');

    await page.locator('.nb-checkmark').click();
    const newTargetRow = page.getByRole('row', {name: 'krif07@gmail.com'});

    await expect(newTargetRow).toHaveText('3LarryBird@twitterkrif07@gmail.com40');
    await expect(newTargetRow).toContainText('krif07@gmail.com');
});
test('web tables 2', async({page}) => {
    // get the row based on the value in the specific column
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    await page.locator('.ng2-smart-page-link').getByText('2').click();
    const targetRowById = page.getByRole('row', {name: '11'})
        .filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRowById.locator('.nb-edit').click();

    const emailInput = page.locator('input-editor').getByPlaceholder('E-mail');
    await emailInput.clear();
    await emailInput.fill('krif07@gmail.com');
    await page.locator('.nb-checkmark').click();
    
    await expect(targetRowById).toContainText('krif07@gmail.com');
    await expect(targetRowById.locator('td').nth(5)).toHaveText('krif07@gmail.com')
});

test('web tables 3', async({page}) => {
    // filter the table
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ['20', '30', '40', '200'];
    const searchInputAge = page.locator('input-filter').getByPlaceholder('Age');
    const ageRows = page.locator('tbody tr');

    for(const age of ages) {
        await searchInputAge.clear();
        await searchInputAge.fill(age);

        await page.locator(`input-filter[ng-reflect-query="${age}"]`).waitFor();

        for(const row of await ageRows.all()) {
            const cell = row.locator('td').last();
            const cellValue = await cell.textContent();

            if(age != '200') {
                expect(cellValue).toEqual(age);
            } else {
                await expect(cellValue).toContain('No data found');
            }
        }

    }
});

test('date pickers', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const datepicker = page.getByPlaceholder('Form Picker')
    await datepicker.click();

    const day = "1";
    const dayToPick = page.locator('[class="day-cell ng-star-inserted"]').getByText(day, {exact: true});
    await dayToPick.click();
    await expect(datepicker).toHaveValue('Apr 1, 2025');
});

test('datepicker 2', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const datepicker = page.getByPlaceholder('Form Picker')
    await datepicker.click();

    let date = new Date();
    date.setDate(date.getDate() + 555);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'});
    const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'});
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthYear = `${expectedMonthLong} ${expectedYear} `;

    const rightNav = page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]');
    while(!calendarMonthYear?.includes(expectedMonthYear)) {
        await rightNav.click();
        calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    const calendarInput = page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true});
    calendarInput.click();

    await expect(datepicker).toHaveValue(dateToAssert);
});

test('sliders 1', async({page}) => {
    //update the attribute
    await page.getByText('IoT Dashboard').click();

    const sliderTemp = page.locator('[tabtitle="Temperature"] circle');
    await sliderTemp.evaluate(node => {
        node.setAttribute('cx', '232.60');
        node.setAttribute('cy', '232.60');
    });
    await sliderTemp.click();
});
test('sliders 2', async({page}) => {
    //Mouse movement
    await page.getByText('IoT Dashboard').click();

    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    //create coordinates x,y (0, 0)
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2; 

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();

    await expect(tempBox).toContainText('30');
});