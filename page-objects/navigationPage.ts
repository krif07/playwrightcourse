import {Locator, Page} from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class NavigationPage extends HelperBase {

    private readonly formLayout: Locator;
    private readonly datepicker: Locator;
    private readonly smartTable: Locator;
    private readonly iotDashboard: Locator;
    private readonly toastr: Locator;
    private readonly tooltip: Locator;

    constructor(page: Page) {
        super(page);
        this.formLayout = page.getByText('Form Layouts');
        this.datepicker = page.getByText('Datepicker');
        this.smartTable = page.getByText('Smart Table');
        this.iotDashboard = page.getByText('IoT Dashboard');
        this.toastr = page.getByText('Toastr');
        this.tooltip = page.getByText('Tooltip');
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem("Forms");
        await this.formLayout.click();
        await this.waitForNumberOfSeconds(2);
    }

    async datepickerPage() {
        await this.selectGroupMenuItem("Forms");
        await this.datepicker.click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem("Tables & Data");
        await this.smartTable.click();
    }

    async iotDashboardPage() {
        await this.iotDashboard.click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastr.click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltip.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if(expandedState == "false") {
            await groupMenuItem.click();
        }
    }
}