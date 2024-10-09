export type StoreTicketDto = {
	issueTypeId: number | '';
	priority: string | '';
	fileId: number | null;
	header: string;
	content: string;
};
