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
				<FileUploader :file="docFile" />
			</UiDropZone>
		</div>

		<div>
			<UButton
				size="lg"
				block
				:loading="submitLoading"
				@click="submit"
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

const docFile = ref<File | null>(null);
const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();
		if (file.type.startsWith('image/')) {
			reader.onload = () => {
				docFile.value = file;
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

const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		if (docFile.value) {
			const compressedFile = await compressImageFile(docFile.value);
			uploadIdCard(compressedFile);
		}
		else {
			toast.add({
				title: useT('error'),
				description: useT('uploadDocFile'),
				timeout: 5000,
				color: 'red',
			});
		}
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
		console.error('Failed:', error);
	}
};

const uploadIdCard = async (image: File) => {
	try {
		submitLoading.value = true;

		await userRepo.uploadIdCard(image);

		emit('set-next-step', 1);

		toast.add({
			title: useT('uploadFile'),
			description: useT('fileUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});

		submitLoading.value = false;
	}
	catch (error: any) {
		submitLoading.value = false;
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
		console.error('Error uploading file:', error);
	}
};

const options = ref([
	{ key: useT('nationalCard'), value: useT('nationalCard') },
	{ key: useT('passport'), value: useT('passport') },
	{ key: useT('birthCertificate'), value: useT('birthCertificate') },
]);
</script>
