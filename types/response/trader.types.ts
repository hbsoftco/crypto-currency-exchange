// type Asset = {
// 	name: string;
// };

type GetUserTraderCommissionListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: string[];
	};
};

export type {
	GetUserTraderCommissionListResponse,
};
