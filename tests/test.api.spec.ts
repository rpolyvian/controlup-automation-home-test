import { expect } from "@playwright/test";
import { test } from "./tests";

test("Scenario 1: Verify Airport Count", async ({
  airportGapApi
}) => {
  const apiResponse = await airportGapApi.sendGetAirportsRequest();
  expect(apiResponse.status()).toBe(200);
  
  const apiResponseJson = await apiResponse.json();
  const itemsCount = 30;
  expect(apiResponseJson.data.length).toEqual(itemsCount);
});

test("Scenario 2: Verify Specific Airports", async ({
  airportGapApi
}) => {
  const apiResponse = await airportGapApi.sendGetAirportsRequest();
  expect(apiResponse.status()).toBe(200);
  
  const apiResponseJson = await apiResponse.json();
  const airports = ['Akureyri Airport', 'St. Anthony Airport', 'CFB Bagotville'];
  airports.forEach(airport => {
    expect(apiResponseJson.data.map((e: { attributes: { name: string; }; }) => e.attributes.name)).toContain(airport);
  });
});

test("Scenario 3: Verify Distance Between Airports", async ({
  airportGapApi
}) => {
  const airportA = "KIX";
  const airportB = "NRT";
  const apiResponse = await airportGapApi.sendPostAirportsDistance(airportA, airportB);
  expect(apiResponse.status()).toBe(200);
  
  const apiResponseJson = await apiResponse.json();
  expect(apiResponseJson.data.attributes.kilometers).toBeGreaterThan(400);
});
