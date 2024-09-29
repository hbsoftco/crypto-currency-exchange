<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="phoneOrEmail"
				placeholder="your@email.com"
				icon=""
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="description"
				placeholder="20/0"
				icon=""
				dir="ltr"
			/>
		</div>
		<div>
			<UButton
				color="white"
				size="lg"
				variant="ghost"
				class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
			>
				{{ $t("confirm") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
// import IconCopy from '~/assets/svg-icons/menu/copy.svg';
// import { useNumber } from '~/composables/useNumber';
const phoneOrEmail = ref<string>('');
</script>
