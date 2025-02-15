<template>
	<div>
		<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark my-4">
			{{ $t('tipsUploadLetter') }}
		</p>
		<p class="text-base font-medium my-8">
			{{ $t('tipsUploadLetterTow') }}
		</p>

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
				{{ $t('confirm') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import FileUploader from '~/components/forms/FileUploader.vue';
import { userRepository } from '~/repositories/user.repository';

interface EmitDefinition {
	(event: 'set-next-step', step: number): void;
}
const emit = defineEmits<EmitDefinition>();

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const toast = useToast();
const router = useRouter();

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
		if (docFile.value) {
			const compressedFile = await compressImageFile(docFile.value);
			uploadSelfy1(compressedFile);
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

const uploadSelfy1 = async (image: File) => {
	try {
		submitLoading.value = true;

		await userRepo.uploadSelfy1(image);

		emit('set-next-step', 1);

		toast.add({
			title: useT('uploadFile'),
			description: useT('fileUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});

		router.push(isMobile.value ? '/' : '/user');
		submitLoading.value = false;
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});

		submitLoading.value = false;
		console.error('Error uploading file:', error);
	}
};
</script>
