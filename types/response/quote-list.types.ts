type GetQuoteParams = {
	marketTypeId: number;
};

type QuoteListResponse = {
	result: QuoteItem[];
	statusCode: number;
};

type QuoteItem = {
	id: number;
};

export type {
	QuoteItem,
	QuoteListResponse,
	GetQuoteParams,
};
