import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetRootListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CardListResponse, DecorationParams, PinListResponse } from '~/types/definitions/decoration.types';
import type { GetLinkListResponse } from '~/types/response/decoration.types';

type DecorationRepository = {
	getCardList: (params: DecorationParams) => Promise<CardListResponse>;
	getPinList: (params: DecorationParams) => Promise<PinListResponse>;

	getLinkList: (params: GetRootListParams) => Promise<GetLinkListResponse>;
};

export const decorationRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): DecorationRepository => ({
	async getCardList(params: DecorationParams): Promise<CardListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/decoration/card_list';
		const response = await fetch<CardListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getPinList(params: DecorationParams): Promise<PinListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/decoration/pin_list';
		const response = await fetch<PinListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

	async getLinkList(params: GetRootListParams): Promise<GetLinkListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/decoration/link_list';
		const response = await fetch<GetLinkListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
