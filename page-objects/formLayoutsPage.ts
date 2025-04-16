import {Locator, Page} from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class FormLayoutsPage extends HelperBase {

    private readonly basicForm: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.basicForm = page.locator('nb-card').filter({hasText: "Using the Grid"});
        this.emailField = this.basicForm.getByRole('textbox', {name: "Email"});
        this.passwordField = this.basicForm.getByRole('textbox', {name: "Password"});
        this.signInButton = this.basicForm.getByRole('button');
    }

    /**
     * This method will out the using grid form
     * @param email 
     * @param password 
     * @param optionText 
     */
    async submitUsingGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.basicForm.getByRole('radio', {name: optionText}).check({force: true});
        await this.signInButton.click();
    }
}