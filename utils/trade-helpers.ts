import type { PrivateTopic, PublicTopic, SocketId } from './enums/socket.enum';

const generatePair = (cSymbol: string, qSymbol: string): string => {
	if (qSymbol === 'TMN' || qSymbol === 'USDT') {
		return `${cSymbol}${qSymbol}`;
	}

	return `${cSymbol}USDT,${qSymbol}USDT`;
};

const getFormattedPairs = (cSymbol: string, qSymbol: string): string => {
	if (qSymbol === 'TMN' || qSymbol === 'USDT') {
		return `${cSymbol}${qSymbol}`;
	}

	return generatePair(cSymbol, qSymbol);
};
const splitSymbols = (symbols: string | null): string[] => {
	if (!symbols) {
		return [];
	}
	return symbols.split(',');
};

const createSubscriptionData = (
	id: SocketId,
	method: 'SUBSCRIBE' | 'UNSUBSCRIBE',
	topic: PublicTopic | PrivateTopic,
	params: string | Record<string, string>,
) => {
	return JSON.stringify({
		id,
		method,
		topic,
		params,
	});
};

export {
	createSubscriptionData,
	splitSymbols,
	getFormattedPairs,
};
