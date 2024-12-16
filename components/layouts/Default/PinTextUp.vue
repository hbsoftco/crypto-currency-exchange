<template>
	<div
		v-if="!shareStore.pinLoading && shareStore.pinUp"
		:class="[isVisible ? 'h-6' : 'h-1 md:h-6']"
	>
		<div
			v-if="isVisible"
			class="relative flex justify-between items-center px-2 md:px-14 py-1 bg-transparency-light dark:bg-transparency-dark opacity-70"
		>
			<div class="flex justify-between w-full">
				<div class="flex justify-start">
					<IconSound class="text-accent-blue" />
					<p class="text-ellipsis overflow-hidden truncate text-xs font-normal text-primary-gray-600 dark:text-subtle-text-dark mr-2">
						{{ shareStore.pinUp }}
					</p>
				</div>
				<div class="flex">
					<ULink to="">
						<span class="text-xs font-bold text-accent-blue ml-2 hidden md:block text-nowrap">{{ $t('showMore') }}</span>
					</ULink>
					<IconClose
						class="cursor-pointer text-accent-blue"
						@click="closeComponent"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSound from '~/assets/svg-icons/sound.svg';
import IconClose from '~/assets/svg-icons/close.svg';

const shareStore = useShareStore();

const isVisible = ref(true);

function closeComponent() {
	isVisible.value = false;
}

onMounted(async () => {
	await shareStore.fetchPinItems();
});
</script>
