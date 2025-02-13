<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center opacity-80"
		>
			<div
				class="w-full md:w-[30rem] flex rounded-md flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-10 py-6 md:py-8 mt-56 md:mt-0 my-32 md:my-0 mx-1 md:mx-20"
			>
				<div class="block md:hidden w-full mb-4">
					<UiTitleWithBack
						:title="$t('invalidate')"
					/>
				</div>
				<div
					v-if="item"
					class="mb-0"
				>
					<div class="flex-1 justify-between text-text-dark dark:text-text-light overflow-hidden rounded-md text-sm">
						<div class="text-center p-4 py-6">
							<div>
								<div
									class="flex flex-col items-start pt-2 justify-center"
								>
									<div
										v-if="item?.address"
										class="w-full"
									>
										<div>
											<vue-qrcode
												class="m-auto"
												:value="item?.address"
												:size="100"
												:level="'H'"
												:background="'#ffffff'"
												:foreground="'#000000'"
											/>
										</div>
										<div class="text-center">
											<p class="text-subtle-text-light dark:text-subtle-text-dark mt-4">
												<span>{{ $t('address') }} </span>
											</p>
											<p
												dir="ltr"
												class="w-full flex justify-center items-start break-all my-2 text-base font-semibold"
											>
												<IconCopy
													class="cursor-pointer text-2xl m-auto"
													@click="copyText(item?.address)"
												/>
												<span class="ml-1">{{ item?.address }}</span>
											</p>
										</div>
									</div>
									<!-- public address -->

									<div
										v-if="item?.memo"
										class="w-full"
									>
										<div>
											<p class="text-subtle-text-light dark:text-subtle-text-dark mt-4">
												<span>Memo/tag</span>
											</p>
											<p
												dir="ltr"
												class="w-full flex justify-center items-start break-all my-2 text-base font-semibold"
											>
												<IconCopy
													class="cursor-pointer text-2xl m-auto"
													@click="copyText(item?.memo)"
												/>
												<span class="ml-1">{{ item?.memo }}</span>
											</p>
										</div>
									</div>
									<!-- memo -->
								</div>

								<div class="flex justify-center mt-5">
									<span>این آدرس بعد از</span>
									<span
										v-if="systemTime"
										class="mx-2"
									>
										<UiTimerCounter
											color="text-primary-yellow-light dark:text-primary-yellow-dark"
											:expire-after="item?.expirationTime"
											:start-time="systemTime"
										/>
									</span>
									<span>منقضی می‌شود.</span>
								</div>

								<p class="text-accent-red dark:text-accent-red mt-6 text-right">
									{{ $t('noticeMessageDeposit') }}
								</p>
							</div>
						</div>
					</div>
					<div class="text-center mb-4">
						<UButton
							:loading="sendDepositAddressToEmailLoading"
							variant="link"
							class="font-medium hover:no-underline"
							@click="sendDepositAddressToEmail"
						>
							{{ $t('depositNeedSecurityVerification') }}
						</UButton>
					</div>
				</div>
			</div>
			<div class=" my-6">
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="isOpen=false"
				/>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import { depositRepository } from '~/repositories/deposit.repository';
import { systemRepository } from '~/repositories/system.repository';
import type { CryptoAddress } from '~/types/definitions/deposit.types';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	item: CryptoAddress | null;
}
const props = defineProps<PropsDefinition>();

const { $api, $mobileDetect } = useNuxtApp();
const depositRepo = depositRepository($api);
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();
const { copyText } = useClipboard();

const systemTime = ref<string>('');
const getSystemTime = async () => {
	try {
		const { result } = await systemRepo.getSystemTime();
		systemTime.value = result;
	}
	catch (error) {
		console.log(error);
	}
};

const sendDepositAddressToEmailLoading = ref<boolean>(false);
const sendDepositAddressToEmail = async () => {
	try {
		sendDepositAddressToEmailLoading.value = true;
		await depositRepo.sendDepositAddressToEmail({ id: String(props.item?.reqId) });

		toast.add({
			title: useT('deposit'),
			description: useT('sentToYourEmailCheckIt'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		sendDepositAddressToEmailLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getSystemTime();
});

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});
watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>
