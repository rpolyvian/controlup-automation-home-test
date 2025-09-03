import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Input } from "../page.factory/input";
import { Account } from "../types/account";

export class LandingPage extends BasePage {
  private readonly _userNameInput: Input;
  private readonly _passwordInput: Input;
  private readonly _loginInput: Input;

  constructor(public page: Page) {
    super(page, "/");

    this._userNameInput = new Input({
      page,
      locator: "#user-name",
      name: "Username Input",
    });
    this._passwordInput = new Input({
      page,
      locator: "#password",
      name: "Password Input",
    });
    this._loginInput = new Input({
      page,
      locator: "#login-button",
      name: "Login Input",
    });
  }

  async checkPageIsOpened(): Promise<void> {
    await expect(this.page).toHaveTitle(
      "Swag Labs"
    );
    await this.verifyPageUrl();
  }

  async fillAndSubmitLoginForm(account: Account): Promise<void> {
    await this._userNameInput.fill(account.email);
    await this._passwordInput.fill(account.password);
    await this._loginInput.click();
  }
}
