<template>
	<div>
		<div class="my-6">
			<span class="my-6 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('twoLevelModalFormOne') }}
			</span>
		</div>
		<div class="my-6">
			<span class="my-6 text-sm font-normal text-black dark:text-white">
				{{ $t('twoLevelModalFormTwo') }}
			</span>
		</div>

		<div class="mb-8">
			<UiDropZone
				@on-transfer="handleFiles"
				@on-drag-enter="handleDragEnter"
				@on-drag-leave="handleDragLeave"
			>
				<template #default="{ dropZoneActive }">
					{{ dropZoneActive }}
					<FileUploader />
				</template>
			</UiDropZone>
		</div>

		<div>
			<UButton
				color="gray"
				class="w-full px-6 py-2 justify-center text-black dark:text-white text-base font-extrabold hover:bg-primary-yellow-light hover:dark:bg-primary-yellow-dark shadow-none"
				:disabled="true"
			>
				{{ $t('confirmAndContinue') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import FileUploader from '~/components/forms/FileUploader.vue';

const handleDragEnter = (event: DragEvent) => {
	console.log('Drag Enter event:', event);
};

const handleDragLeave = (event: DragEvent) => {
	console.log('Drag Leave event:', event);
};

const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();

		if (file.type === 'application/pdf') {
			alert('hosseinam');
		}
		else if (file.type.startsWith('image/')) {
			reader.onload = () => {
				// uploadAvatar(file);
			};
			reader.readAsDataURL(file);
		}
	}
};
</script>
