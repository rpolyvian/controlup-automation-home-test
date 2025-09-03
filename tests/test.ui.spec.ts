import { test } from "./tests";
import { Account } from "../types/account";

test.beforeEach(async ({ landingPage, inventoryPage }) => {
  await landingPage.visit(landingPage.URL);
  await landingPage.checkPageIsOpened();
  const account: Account = {
    email: "standard_user",
    password: "secret_sauce"
  };
  await landingPage.fillAndSubmitLoginForm(account);
  await inventoryPage.checkPageIsOpened();
});

test("Scenario 1: Verify Inventory Items", async ({
  inventoryPage
}) => {
  const itemsCount = 6;
  await inventoryPage.verifyInventoryItemsCount(itemsCount);
});

test("Scenario 2: Add Item to Cart", async ({
  inventoryPage
}) => {
  await inventoryPage.addFirstInventoryItemToCart();
  const count = 1;
  await inventoryPage.verifyCartBadgeCount(count);
});

