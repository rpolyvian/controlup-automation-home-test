import { request, APIResponse, APIRequestContext } from '@playwright/test';
import airportGapApiEndpoints from './airport.gap.api.endpoints';

export class AirportGapApi {
	private _apiRequestContext: APIRequestContext | undefined;

	async dispose(): Promise<void> {
		if (this._apiRequestContext) {
			await this._apiRequestContext.dispose();
		}
	}

	private async getApiRequestContext(): Promise<APIRequestContext> {
		if (!this._apiRequestContext) {
			this._apiRequestContext = await request.newContext({
				// All requests we send go to this API endpoint.
				baseURL: "https://airportgap.com/api/",
				extraHTTPHeaders: {
					'Content-type': 'application/json',
				}
			});
		}
		return this._apiRequestContext;
	}

	async sendGetAirportsRequest(): Promise<APIResponse> {
		const apiRequestContext: APIRequestContext = await this.getApiRequestContext();
		const apiResponse = await apiRequestContext.get(airportGapApiEndpoints.getAirports);
		return apiResponse;
	}

	async sendPostAirportsDistance(airportA: string, airportB: string): Promise<APIResponse> {
		const apiRequestContext: APIRequestContext = await this.getApiRequestContext();
		const apiResponse = await apiRequestContext.post(
      airportGapApiEndpoints.postAirportsDistance, {
        data: {
          from: airportA,
          to: airportB
			  }
		  }
    );
		return apiResponse;
	}
}
