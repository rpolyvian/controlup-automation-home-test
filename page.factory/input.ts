import test, { expect } from '@playwright/test';
import { LocatorProps } from '../types/page-factory/component';
import { Component } from './component';

type FillProps = { validateValue?: boolean } & LocatorProps;

export class Input extends Component {
	get typeOf(): string {
		return 'input';
	}

	async fill(value: string, fillProps: FillProps = {}): Promise<void> {
		const { validateValue, ...locatorProps } = fillProps;

		await test.step(`Fill ${this.typeOf} '${this.componentName}' to value '${value}'`, async () => {
			const locator = this.getLocator(locatorProps);
			await locator.fill(value);

			if (validateValue) {
				await this.shouldHaveValue(value, locatorProps);
			}
		});
	}

	async pasteFromClipboard(value: string, locatorProps: LocatorProps = {}): Promise<void> {
		await test.step(`Paste to ${this.typeOf} '${this.componentName}' value '${value}' from clipboard`, async () => {
			const locator = this.getLocator(locatorProps);
			// focus on the input
			await locator.focus();

			// copy text to clipboard
			await this.page.evaluate((data: string) => navigator.clipboard.writeText(data), value);

			// paste text from clipboard
			const modifier = (function () {
				switch (process.platform) {
					case 'darwin':
						return 'Meta';
					default:
						return 'Control';
				}
			})();
			await locator.press(`${modifier}+a`);
			await locator.press(`${modifier}+v`);

			// check if the input has the value
			await expect(locator).toHaveValue(value);
		});
	}

	async clearFromClipboard(locatorProps: LocatorProps = {}): Promise<void> {
		await test.step(`Clear ${this.typeOf} '${this.componentName}' from clipboard`, async () => {
			const locator = this.getLocator(locatorProps);
			// focus on the input
			await locator.focus();

			// clear from clipboard
			const modifier = (function () {
				switch (process.platform) {
					case 'darwin':
						return 'Meta';
					default:
						return 'Control';
				}
			})();
			await locator.press(`${modifier}+a`);
			await locator.press(`Delete`);

			// check if the input has the value
			await expect(locator).toHaveValue('');
		});
	}
}
