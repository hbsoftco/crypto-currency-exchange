import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetTicketListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { AddChatDto, StoreTicketDto, TicketCloseDto } from '~/types/dto/ticketing.dto';
import type { CommonRes, KeyValueRes } from '~/types/response/common.types';
import type { GetChatListRes, StoreAddChatRes, StoreTicketRes } from '~/types/response/ticketing.types';
import type { GetTicketListResponse } from '~/types/response/user.types';

type TicketRepository = {
	storeTicket: (dto: StoreTicketDto) => Promise<StoreTicketRes>;
	getTicketTypes: () => Promise<KeyValueRes>;
	uploadFile: (wloId: string, dto: any) => Promise<CommonRes>;
	getTicketList: (params: GetTicketListParams) => Promise<GetTicketListResponse>;
	ticketClose: (params: TicketCloseDto) => Promise<CommonRes>;
	storeAddChat: (dto: AddChatDto) => Promise<StoreAddChatRes>;
	getChatList: (id: string) => Promise<GetChatListRes>;
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
	async getTicketList(params: GetTicketListParams): Promise<GetTicketListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/ticketing/list';
		const response = await fetch<GetTicketListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async ticketClose(dto: TicketCloseDto): Promise<CommonRes> {
		const url = `v1/user/ticketing/close`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeAddChat(dto: AddChatDto): Promise<StoreAddChatRes> {
		const url = `/v1/user/ticketing/append`;
		const response = await fetch<StoreAddChatRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getChatList(id: string): Promise<GetChatListRes> {
		const query = new URLSearchParams(
			Object.entries({ id })
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/ticketing/get';
		const response = await fetch<GetChatListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
