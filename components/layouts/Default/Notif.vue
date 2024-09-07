<template>
	<div :class="[isVisible ? 'h-6' : 'h-1 md:h-6']">
		<div
			v-if="isVisible"
			class="relative flex justify-between items-center px-2 md:px-6 py-1 bg-transparency-light dark:bg-transparency-dark opacity-70"
		>
			<div class="flex w-full">
				<IconSound class="text-accent-blue" />
				<p class="text-ellipsis overflow-hidden truncate text-xs font-normal text-primary-gray-600 dark:text-subtle-text-dark mr-2">
					{{ pinWithTagUp?.info[0]?.text }}
				</p>
				<ULink to="">
					<span class="text-xs font-bold text-accent-blue ml-2 hidden md:block">{{ $t('showMore') }}</span>
				</ULink>
				<IconClose
					class="cursor-pointer text-accent-blue"
					@click="closeComponent"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSound from '~/assets/svg-icons/sound.svg';
import IconClose from '~/assets/svg-icons/close.svg';

const isVisible = ref(true);

function closeComponent() {
	isVisible.value = false;
}

const baseDataStore = useBaseDataStore();

await baseDataStore.fetchPinItems();

const pins = baseDataStore.pinItems;

const pinWithTagUp = computed(() => pins.find((pin) => pin.tag === 'up'));
</script>

<style scoped></style>
