import {test, expect} from '@playwright/test';
import {PageManager} from '../page-objects/pageManager';


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
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

test('submit using grid Form with credentials And Select Option', async({page}) => {
    const pageManager = new PageManager(page);
    const formLayoutsPage = pageManager.onFormLayoutPage();
    
    await pageManager.navigateTo().formLayoutsPage();
    await formLayoutsPage.submitUsingGridFormWithCredentialsAndSelectOption('myemail@mail.com', 'mipassword', "Option 2");
});

test('select day from From datepikcer', async({page}) => {
    const pageManager = new PageManager(page);
    const datepickerPage = pageManager.onDatepickerPage();
    await pageManager.navigateTo().datepickerPage();
    await datepickerPage.selectCommonDatePickerDateFromToday(55);

    await datepickerPage.selectDatePickerWithRangeFromToday(67, 69);
});
