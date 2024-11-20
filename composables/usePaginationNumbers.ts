import type { UPagination } from '#build/components';
import { useNumber } from '~/composables/useNumber';

export const usePaginationNumbers = () => {
	const showPagination = ref<boolean>(false);

	const applyChangesToLinks = (pagination: InstanceType<typeof UPagination>) => {
		nextTick(() => {
			if (pagination && pagination.$el) {
				const elements = pagination.$el.querySelectorAll('a');
				if (elements.length > 0) {
					elements.forEach((aTag: HTMLAnchorElement) => {
						const spanTag = aTag.querySelector('span');
						if (spanTag) {
							const numberText = spanTag.textContent?.trim();
							if (numberText) {
								spanTag.textContent = useNumber(numberText);
							}

							showPagination.value = true;
						}
					});
				}
			}
		});
	};

	return {
		showPagination,
		applyChangesToLinks,
	};
};
