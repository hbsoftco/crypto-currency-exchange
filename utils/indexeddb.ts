import { get, set, del } from 'idb-keyval';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CachedData<T> {
	value: T;
	timestamp: number;
}

const saveToCache = async <T>(key: string, value: T) => {
	const data: CachedData<T> = {
		value,
		timestamp: Date.now(),
	};
	await set(key, data);
};

const loadFromCache = async <T>(key: string): Promise<T | null> => {
	const cachedData = await get<CachedData<T>>(key);

	if (!cachedData) return null;

	const { value, timestamp } = cachedData;

	if (Date.now() - timestamp > CACHE_DURATION) {
		return null;
	}

	return value;
};

const removeFromCache = async (key: string): Promise<void> => {
	await del(key);
};

export {
	saveToCache,
	loadFromCache,
	removeFromCache,
};
