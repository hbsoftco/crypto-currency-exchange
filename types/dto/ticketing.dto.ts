export type StoreTicketDto = {
	issueTypeId: number | '';
	priority: string | '';
	fileId: number | null;
	header: string;
	content: string;
};

export type TicketCloseDto = {
	id: number;
};

export type AddChatDto = {
	id: number;
	fileId?: number;
	content: string;
};
