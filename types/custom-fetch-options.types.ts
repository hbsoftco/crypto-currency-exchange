import type { FetchContext, FetchOptions } from 'ofetch';

export interface CustomFetchOptions extends FetchOptions {
	noAuth?: boolean;
}

export interface CustomFetchContext<ResponseType> extends FetchContext<ResponseType> {
	options: CustomFetchOptions;
}
