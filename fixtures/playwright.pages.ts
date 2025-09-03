import { Fixtures } from "@playwright/test";
import { ContextPagesFixture } from "./context.pages";
import { LandingPage } from "../pages/landing.page";
import { InventoryPage } from "../pages/inventory.page";
import { AirportGapApi } from "../utils/apis/airport.gap.api";

export type PlaywrightPagesFixture = {
  landingPage: LandingPage;
  inventoryPage: InventoryPage;
  airportGapApi: AirportGapApi;
};

export const playwrightPagesFixture: Fixtures<
  PlaywrightPagesFixture,
  ContextPagesFixture
> = {
  landingPage: async ({ contextPage }, use) => {
    const landingPage = new LandingPage(contextPage);

    await use(landingPage);
  },
  inventoryPage: async ({ contextPage }, use) => {
    const inventoryPage = new InventoryPage(contextPage);

    await use(inventoryPage);
  },
  airportGapApi: async ({}, use) => {
    const airportGapApi = new AirportGapApi();

    await use(airportGapApi);

    await airportGapApi.dispose();
  },
};
