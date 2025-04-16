import {expect, Locator, Page} from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class DatepickerPage extends HelperBase {
    private calendarMonthYearLocator: Locator;
    private rightArrowNavigatorLocator: Locator;
    private calendarDayCell: Locator;

    constructor(page: Page) {
        super(page);
        this.calendarMonthYearLocator = page.locator('nb-calendar-view-mode');
        this.rightArrowNavigatorLocator = page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]');
        this.calendarDayCell = page.locator('.day-cell.ng-star-inserted');
    }

    private async selectDateInTheCalendar(numberOfDaysFromToady: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToady);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'});
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'});
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        
        const expectedMonthYear = `${expectedMonthLong} ${expectedYear} `;

        let calendarMonthYear = await this.calendarMonthYearLocator.textContent();
        while(!calendarMonthYear?.includes(expectedMonthYear)) {
            await this.rightArrowNavigatorLocator.click();
            calendarMonthYear = await this.calendarMonthYearLocator.textContent();
        }
        const calendarDayCellToSelect = this.calendarDayCell.getByText(expectedDate, {exact: true});
        await calendarDayCellToSelect.click();
        return dateToAssert;
    }

    /**
     * 
     * @param numberOfDaysFromToady 
     */
    async selectCommonDatePickerDateFromToday(numberOfDaysFromToady: number) {
        const datepicker = this.page.getByPlaceholder("Form Picker");
        await datepicker.click();
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToady);
        expect(datepicker).toHaveValue(dateToAssert);
    }

    /**
     * 
     * @param numberOfDaysFromToady 
     * @param endDayFromToday 
     */
    async selectDatePickerWithRangeFromToday(numberOfDaysFromToady: number, endDayFromToday) {
        const datepicker = this.page.getByPlaceholder("Range Picker");
        await datepicker.click();
        const startDateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToady);
        const endDateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToady);
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`;

        expect(datepicker).toHaveValue(dateToAssert);
    }
}