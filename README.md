Before starting, make sure you have [Node](https://nodejs.org/en/) installed on your system.

Steps how to run the tests:
1) open folder with tests in terminal
2) ```npm install``` execute to install necessary packages
3) ```npx playwright install --with-deps chromium``` execute to install Playwright chromium browser to be able to run tests
4) ```npx playwright test --config=playwright.config.ts``` execute to run tests
5) ```npx playwright show-report``` execute to see full report of tests

If you want to run tests with UI Mode please add ```--ui``` to the command from the 4th step.
