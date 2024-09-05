import type { ProfilePair } from '~/types/response/profile.types';

export const getValueByKey = (array: ProfilePair[], key: string) => {
	const foundItem = array.find((item) => item.key === key);
	return foundItem ? foundItem.value || foundItem.value : null;
};
