import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { StoreTicketDto } from '~/types/dto/ticketing.dto';
import type { CommonRes, KeyValueRes } from '~/types/response/common.types';
import type { StoreTicketRes } from '~/types/response/ticketing.types';

type TicketRepository = {
	storeTicket: (dto: StoreTicketDto) => Promise<StoreTicketRes>;
	getTicketTypes: () => Promise<KeyValueRes>;
	uploadFile: (wloId: string, dto: any) => Promise<CommonRes>;
};

export const ticketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): TicketRepository => ({
	async getTicketTypes(): Promise<KeyValueRes> {
		const url = '/v1/user/ticketing/type_list';
		const response = await fetch<KeyValueRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeTicket(dto: StoreTicketDto): Promise<StoreTicketRes> {
		const url = `/v1/user/ticketing/create`;
		const response = await fetch<StoreTicketRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadFile(wloId: string, dto: any): Promise<CommonRes> {
		const formData = new FormData();
		formData.append('file', dto.file);

		const url = `/v1/upload/ticket`;
		const response = await fetch<CommonRes>(`${url}`, {
			method: 'POST',
			body: formData,
		});

		return response;
	},
});
