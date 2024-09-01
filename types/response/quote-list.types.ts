type GetQuoteParams = {
	marketTypeId: number;
};

type QuoteListResponse = {
	result: { id: number }[];
	statusCode: number;
};

export type {
	QuoteListResponse,
	GetQuoteParams,
};
