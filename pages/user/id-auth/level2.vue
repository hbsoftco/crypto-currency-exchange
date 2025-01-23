<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('secondLevelAuthentication')"
		/>
		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('secondLevelAuthentication')" />
		</div>
		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10  px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-80 px-3 md:px-0">
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
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					:tag-type="TagType.IDENTIFICATION"
					image-class="w-full"
					:image="'/images/commitment.png'"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import FileUploader from '~/components/forms/FileUploader.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { userRepository } from '~/repositories/user.repository';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

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
			uploadSelfy2(compressedFile);
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
		console.error('Failed:', error);
	}
};

const uploadSelfy2 = async (image: File) => {
	try {
		submitLoading.value = true;

		await userRepo.uploadSelfy2(image);

		toast.add({
			title: useT('uploadFile'),
			description: useT('fileUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});

		router.push(isMobile.value ? '/' : '/user');
		submitLoading.value = false;
	}
	catch (error) {
		console.error('Error uploading file:', error);
	}
};

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const steps = ref([
	{ label: useT('uploadCommitmentLetter2'), completed: false, current: true },
	{ label: useT('finished'), completed: false, current: false },
]);
</script>
