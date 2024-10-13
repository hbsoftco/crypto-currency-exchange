import type { KeyValue } from '~/types/base.types';

export const getValueByKey = (array: KeyValue[], key: string) => {
	if (!array.length) {
		return null;
	}
	const foundItem = array.find((item) => item.key === key);
	return foundItem ? (foundItem.value ? foundItem.value : null) || foundItem.value : null;
};
