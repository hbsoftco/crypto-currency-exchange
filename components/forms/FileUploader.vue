<template>
	<div class="p-6 border-2 rounded-md border-dashed border-gray-600">
		<div
			v-if="imgPreview"
			class="mb-4"
		>
			<img
				:src="imgPreview"
				alt="Preview"
			>
		</div>
		<div class="text-xs text-center text-subtle-text-light dark:text-subtle-text-50">
			<p class="mb-1">
				حداکثر حجم قابل قبول برای هر عکس : 5 مگابایت
			</p>
			<p>فرمت های قابل قبول: JPG, PNG</p>
		</div>
		<UButton
			size="lg"
			variant="ghost"
			class="px-8 mt-6 w-full justify-center font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
		>
			{{ $t('selectFile') }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	file?: File | null;
}
const props = defineProps<PropsDefinition>();

watch(
	() => props.file,
	(newValue) => {
		if (newValue) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imgPreview.value = e.target?.result as string;
			};
			reader.readAsDataURL(newValue);
		}
		else {
			imgPreview.value = null;
		}
	},
);

const imgPreview = ref<string | null>(null);
</script>
