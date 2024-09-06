import type { FetchContext, FetchOptions } from 'ofetch';

export interface CustomFetchOptions extends FetchOptions {
	noAuth?: boolean;
	apiName: string;
}

export interface CustomFetchContext<ResponseType> extends FetchContext<ResponseType> {
	options: CustomFetchOptions;
}
