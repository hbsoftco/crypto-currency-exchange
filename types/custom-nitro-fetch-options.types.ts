import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export interface CustomNitroFetchOptions<R extends NitroFetchRequest = NitroFetchRequest>
	extends NitroFetchOptions<R> {
	noAuth?: boolean;
	apiName?: string;
	queryParams?: object;
}
