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

type FileItem = {
	id: number;
	fileId: number;
	fileUrl: string;
	writerUid: number;
	writerUser: string;
	regTime: string;
	content: string;
};

type StoreAddChatRes = {
	statusCode: number;
	result: FileItem;
};

type ChatItem = {
	id: number;
	fileId: number;
	fileUrl: string;
	writerUid: number;
	writerUser: string;
	regTime: string;
	content: string;
};

type GetChatListRes = {
	statusCode: number;
	result: ChatItem[];
};

export type {
	StoreTicketRes,
	Ticket,
	StoreAddChatRes,
	FileItem,
	GetChatListRes,
};
