<template>
	<div>
		<p class="text-sm mt-10 mb-4">
			{{ $t('selectAndUploadOneOfTheFollowingIdentityDocuments') }}
		</p>
		<div class="mb-8">
			<DropDown
				id="name"
				v-model="dto.name"
				:options="options"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
				:error-message="v$.name.$error? $t('fieldIsRequired') : ''"
			/>
		</div>

		<div class="mb-8">
			<UiDropZone
				@on-transfer="handleFiles"
				@on-drag-enter="handleDragEnter"
				@on-drag-leave="handleDragLeave"
			>
				<FileUploader />
			</UiDropZone>
		</div>

		<div>
			<UButton
				size="lg"
				block
				:loading="loading"
			>
				{{ $t('confirmAndContinue') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import DropDown from '~/components/forms/DropDown.vue';
import FileUploader from '~/components/forms/FileUploader.vue';
import { userRepository } from '~/repositories/user.repository';

interface EmitDefinition {
	(event: 'set-next-step', step: number): void;
}
const emit = defineEmits<EmitDefinition>();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const toast = useToast();

const dto = ref({	name: '' });
const dtoRules = {	name: { required: validations.required } };
const v$ = useVuelidate(dtoRules, dto);

const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();
		if (file.type.startsWith('image/')) {
			reader.onload = () => {
				uploadIdCard(file);
			};
			reader.readAsDataURL(file);
		}
	}
};

const handleDragEnter = (event: DragEvent) => {
	console.log('Drag Enter event:', event);
};

const handleDragLeave = (event: DragEvent) => {
	console.log('Drag Leave event:', event);
};

const uploadIdCard = async (image: File) => {
	try {
		await userRepo.uploadIdCard(image);

		emit('set-next-step', 1);

		toast.add({
			title: useT('uploadAvatar'),
			description: useT('avatarUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error) {
		console.error('Error uploading file:', error);
	}
};

const options = ref([
	{ key: useT('nationalCard'), value: useT('nationalCard') },
	{ key: useT('passport'), value: useT('passport') },
	{ key: useT('birthCertificate'), value: useT('birthCertificate') },
]);

const loading = ref(false);
</script>
