type StoreTicketRes = {
	statusCode: number;
	result: Ticket;
};

type Ticket = {
	id: number;
	typeId: number;
	typeName: string;
	stateId: number;
	stateName: string;
	priorityId: number;
	priorityName: string;
	creatorUid: number;
	creatorName: string;
	header: string;
	regTime: string;
};

export type {
	StoreTicketRes,
	Ticket,
};
