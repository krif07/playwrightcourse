import {test, expect} from '@playwright/test';
import {NavigationPage} from '../page-objects/navigationPage';
import {FormLayoutsPage} from '../page-objects/formLayoutsPage';
import {DatepickerPage} from '../page-objects/datepickerPage';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
});

/**
 * 
 */
test('Navigate to forms page', async({page}) => {
    const nav = new NavigationPage(page);
    await nav.formLayoutsPage();
    await nav.datepickerPage();
    await nav.smartTablePage();
    await nav.iotDashboardPage();
    await nav.toastrPage();
    await nav.tooltipPage();
});

/**
 * 
 */
test('submit using grid Form with credentials And Select Option', async({page}) => {
    const formLayoutsPage = new FormLayoutsPage(page);
    const nav = new NavigationPage(page);

    await nav.formLayoutsPage();
    await formLayoutsPage.submitUsingGridFormWithCredentialsAndSelectOption('myemail@mail.com', 'mipassword', "Option 2");
});

test('select day from From datepikcer', async({page}) => {
    const datepickerPage = new DatepickerPage(page);
    const nav = new NavigationPage(page);

    await nav.datepickerPage();
    await datepickerPage.selectCommonDatePickerDateFromToday(55);

    await datepickerPage.selectDatePickerWithRangeFromToday(67, 69);
});
