import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Div } from "../page.factory/div";
import { Button } from "../page.factory/button";
import { Span } from "../page.factory/span";

export class InventoryPage extends BasePage {
  private readonly _inventoryItemDivs: Div;
  private readonly _addFirstInventoryItemToCartButton: Button;
  private readonly _shoppingCartBadgeSpan: Span;

  constructor(public page: Page) {
    super(page, "/inventory.html");

    this._inventoryItemDivs = new Div({
    page,
      locator: ".inventory_item",
      name: "Inventory Item Divs",
    });
    this._addFirstInventoryItemToCartButton = new Button({
    page,
      locator: `${this._inventoryItemDivs.locator}:first-child .btn_inventory`,
      name: "Add First Inventory Item to Cart Button",
    });
    this._shoppingCartBadgeSpan = new Span({
      page,
      locator: ".shopping_cart_badge",
      name: "Shopping Cart Badge Span"
    })
  }

  async checkPageIsOpened(): Promise<void> {
    await expect(this.page).toHaveTitle(
      "Swag Labs"
    );
    await this.verifyPageUrl();
  }

  async verifyInventoryItemsCount(itemsCount: number): Promise<void> {
    await this._inventoryItemDivs.shouldHaveCount(itemsCount);
  }

  async addFirstInventoryItemToCart(): Promise<void> {
    await this._addFirstInventoryItemToCartButton.click();
  }

  async verifyCartBadgeCount(count: number): Promise<void> {
    await this._shoppingCartBadgeSpan.shouldHaveText(count.toString());
  }
}
