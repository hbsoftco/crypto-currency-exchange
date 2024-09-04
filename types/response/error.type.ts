type ErrorResponse = {
	response: {
		_data: BodyErrorResponse;
		status: number;
	};
};

type BodyErrorResponse = {
	message: string;
	statusCode: number;
};

export type {
	ErrorResponse,
};
