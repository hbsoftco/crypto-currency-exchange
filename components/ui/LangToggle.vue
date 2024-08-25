<template>
	<ClientOnly>
		<UToggle
			:model-value="isFa"
			class="text-hover-light dark:text-hover-dark bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full flex items-center justify-between px-1"
			size="lg"
			aria-label="Number Format"
			@update:model-value="toggleNumberFormat"
		>
			<template #checked>
				<div class="text-sm font-bold text-center w-full">
					FA
				</div>
			</template>
			<template #unchecked>
				<div class="text-sm font-bold text-center w-full">
					EN
				</div>
			</template>
		</UToggle>

		<!-- نمایش اعداد به فرمت انتخابی -->
		<p class="mt-4 text-lg font-bold">
			{{ formattedNumber }}
		</p>

		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>

<script setup lang="ts">
const loadNumberFormat = () => {
	const savedFormat = localStorage.getItem('number-type');
	return savedFormat === 'fa' ? true : false;
};

const isFa = ref(loadNumberFormat());

const toggleNumberFormat = (value: boolean) => {
	isFa.value = value;
	localStorage.setItem('number-type', value ? 'fa' : 'en');
};

const number = ref(1234567890);

const formattedNumber = computed(() => {
	return isFa.value
		? number.value.toLocaleString('fa-IR')
		: number.value.toLocaleString('en-US');
});
</script>
