import type { WritableComputedRef } from 'vue';

export const useSyncProps = <T>(
	props: Record<string, T>,
	key: string,
	emit: (event: string, value: T) => void,
): WritableComputedRef<T> => {
	return computed({
		get() {
			return props[key];
		},
		set(value) {
			emit(`update:${key}`, value);
		},
	});
};
