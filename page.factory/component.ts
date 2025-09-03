import { expect, Locator, Page, test } from "@playwright/test";
import { ComponentProps, LocatorProps } from "../types/page-factory/component";
import { capitalizeFirstLetter } from "../utils/generic";
import { locatorTemplateFormat } from "../utils/page-factory";

export abstract class Component {
  page: Page;
  locator: string;
  private name: string | undefined;

  constructor({ page, locator, name }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
  }

  getLocator(props: LocatorProps = {}): Locator {
    const { locator, ...context } = props;
    const withTemplate = locatorTemplateFormat(
      locator || this.locator,
      context
    );

    return this.page.locator(withTemplate);
  }

  get typeOf(): string {
    return "component";
  }

  get typeOfUpper(): string {
    return capitalizeFirstLetter(this.typeOf);
  }

  get componentName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  private getErrorMessage(action: string): string {
    return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.locator} ${action}`;
  }

  async shouldBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage("is not visible"),
      }).toBeVisible();
    });
  }

  async atLeastOneShouldBeVisible(
    locatorProps: LocatorProps = {}
  ): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator.first(), {
        message: this.getErrorMessage("is not visible"),
      }).toBeVisible();
    });
  }

  async shouldNotBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should not be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage("is visible"),
      }).toBeHidden();
    });
  }

  async shouldHaveText(
    text: string,
    locatorProps: LocatorProps = {}
  ): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${text}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage(`does not have text "${text}"`),
      }).toHaveText(text);
    });
  }

  async click(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`Clicking the ${this.typeOf} with name "${this.componentName}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await locator.click();
    });
  }

  async shouldHaveClass(
    className: string,
    locatorProps: LocatorProps = {}
  ): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have class "${className}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage(`does not have class "${className}"`),
      }).toHaveClass(className);
    });
  }

  async shouldHaveValue(
    value: string,
    locatorProps: LocatorProps = {}
  ): Promise<void> {
    value = value || "";
    await test.step(`Checking that ${this.typeOf} "${this.componentName}" has a value "${value}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage(`does not have value "${value}"`),
      }).toHaveValue(value);
    });
  }

  async shouldBeEnabled(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be enabled on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage("is not enabled"),
      }).toBeEnabled();
    });
  }

  async shouldHaveCount(
    count: number,
    locatorProps: LocatorProps = {}
  ): Promise<void> {
    await test.step(`Checking that ${this.typeOfUpper} "${this.componentName}" has a count "${count}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage(`does not have count "${count}"`),
      }).toHaveCount(count);
    });
  }

  async shouldBeChecked(locatorProps: LocatorProps = {}): Promise<void> {
    await this.assertCheckedState(locatorProps, true);
  }

  async shouldNotBeChecked(locatorProps: LocatorProps = {}): Promise<void> {
    await this.assertCheckedState(locatorProps, false);
  }

  async getAttribute(
    attribute: string,
    locatorProps: LocatorProps = {}
  ): Promise<null | string> {
    return await test.step(`Get attribute "${attribute}" of ${this.typeOfUpper} "${this.componentName}"`, async () => {
      const locator = this.getLocator(locatorProps);
      return await locator.getAttribute(attribute);
    });
  }

  private async assertCheckedState(
    locatorProps: LocatorProps,
    checked: boolean
  ): Promise<void> {
    await test.step(`Checking that ${this.typeOf} '${this.componentName}' is ${
      !checked && "not"
    } checked`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, {
        message: this.getErrorMessage(`is ${!checked && "not"} checked`),
      }).toBeChecked({ checked: checked });
    });
  }
}
