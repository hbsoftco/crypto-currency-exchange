<template>
	<div
		v-if="!shareStore.pinLoading && shareStore.pinUp"
	>
		<div
			v-if="isVisible"
			class="w-full top-14 px-14 py-2 bg-transparency-light dark:bg-transparency-dark opacity-70 z-40 fixed left-0"
		>
			<div class="flex justify-between w-full">
				<div class="flex justify-start">
					<IconSound class="text-accent-blue text-xl" />
					<p class="text-xs font-medium text-text-dark dark:text-text-light mr-2">
						{{ shareStore.pinUp.info[0].text }}
					</p>
				</div>
				<div class="flex items-center flex-shrink-0">
					<ULink to="">
						<span class="text-xs font-medium text-accent-blue ml-2 hidden md:block text-nowrap">{{ $t('showMore') }}</span>
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
