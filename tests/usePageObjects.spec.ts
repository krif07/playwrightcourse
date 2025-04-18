import {test, expect} from '@playwright/test';
import {PageManager} from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';

test.beforeEach(async({page}) => {
    await page.goto('/');
});

test('Navigate to forms page', async({page}) => {
    const pageManager = new PageManager(page);
    await pageManager.navigateTo().formLayoutsPage();
    await pageManager.navigateTo().datepickerPage();
    await pageManager.navigateTo().smartTablePage();
    await pageManager.navigateTo().iotDashboardPage();
    await pageManager.navigateTo().toastrPage();
    await pageManager.navigateTo().tooltipPage();
});

test('submit using grid Form with credentials And Select Option', async({page}, testInfo) => {
    if(testInfo.retry) {
        //do something
        console.log(testInfo)
    }
    const pageManager = new PageManager(page);
    const formLayoutsPage = pageManager.onFormLayoutPage();
    const randomFullName = faker.person.fullName();
    const email = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@gmail.com`;
    
    await pageManager.navigateTo().formLayoutsPage();
    await formLayoutsPage.submitUsingGridFormWithCredentialsAndSelectOption(email, process.env.PASSWORD+"", "Option 2");
    page.screenshot({path: 'screenshots/formLayoutsPage.png'});
    page.locator('nb-card').filter({hasText: "Using the Grid"}).screenshot({path: 'screenshots/form.png'});
    await page.waitForTimeout(3000)
    //expect(true).toBe(false);
});

test('select day from From datepikcer', async({page}) => {
    const pageManager = new PageManager(page);
    const datepickerPage = pageManager.onDatepickerPage();
    await pageManager.navigateTo().datepickerPage();
    await datepickerPage.selectCommonDatePickerDateFromToday(55);

    await datepickerPage.selectDatePickerWithRangeFromToday(67, 69);
});
