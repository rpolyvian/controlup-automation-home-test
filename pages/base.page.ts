import test, { expect, Page } from "@playwright/test";
import playwrightConfig from "../playwright.config";

export class BasePage {
  readonly URL: string;

  constructor(public page: Page, url: string) {
    this.URL = url;
  }

  async visit(url: string): Promise<void> {
    await test.step(`Opening the url '${url}'`, async () => {
      await this.page.goto(url, { waitUntil: "networkidle" });
    });
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();

    await test.step(`Reloading page with url '${currentUrl}'`, async () => {
      await this.page.reload({ waitUntil: "domcontentloaded" });
    });
  }

  protected async verifyPageUrl(): Promise<void> {
    await test.step("Verify page url", async () => {
      const expectedUrl = new URL(this.URL, playwrightConfig.use?.baseURL);
      expect(this.page.url()).toEqual(expectedUrl.href);
    });
  }
}
