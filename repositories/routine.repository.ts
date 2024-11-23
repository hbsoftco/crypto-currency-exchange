import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { BaseLangIdParams } from '~/types/definitions/common.types';
import type { RoutineResponse } from '~/types/definitions/routine.types';

type RoutineRepository = {
	getRoutineHelp: (params: BaseLangIdParams) => Promise<RoutineResponse>;
};

export const routineRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): RoutineRepository => ({
	async getRoutineHelp(params: BaseLangIdParams): Promise<RoutineResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/get';
		const response = await fetch<RoutineResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

});
