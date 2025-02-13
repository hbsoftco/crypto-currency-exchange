<template>
	<div v-if="bankAccountDpiListLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-6"
	>
		<div
			v-if="getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '1' || getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '2'"
		>
			<div v-if="selectedBankAccountDpi.length">
				<div class="mb-8">
					<FormsDropDown
						id="docs"
						v-model="provider"
						:options="options"
						type="text"
						input-class="text-right"
						label="noText"
						placeholder=""
						:default-id="defaultId"
						icon=""
						color-type="transparent"
					/>
				</div>
				<!-- Providers -->
				<div
					v-for="item in selectedBankAccountDpi"
					:key="item.compID"
					class="px-6 py-3 rounded-md border border-secondary-gray-light dark:border-secondary-gray-dark"
				>
					<div
						class="pb-1 flex items-center justify-between text-subtle-text-light dark:text-subtle-text-dark w-full border-b border-secondary-gray-light dark:border-secondary-gray-dark my-1"
					>
						<p>{{ $t('depositInfo') }}</p>
						<IconCopy
							class="cursor-pointer text-3xl"
							@click="copyData(item)"
						/>
					</div>
					<div class="my-2">
						<div class="mb-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('nameDestinationBank') }}
							</span>
						</div>
						<div class="text-left">
							<span class="text-base font-bold">{{ item.destBankName }}</span>
						</div>
					</div>
					<div class="my-2">
						<div class="mb-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('shabaNumber') }}
							</span>
						</div>
						<div class="flex justify-end">
							<span class="text-base font-bold text-left">{{ item.destIban }}</span>
						</div>
					</div>
					<div class="my-2">
						<div class="mb-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('depositId') }}
							</span>
						</div>
						<div class="flex justify-end">
							<span class="text-base font-bold text-left">{{ item.destDepositId }}</span>
						</div>
					</div>
					<div class="my-2">
						<div class="mb-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{
								$t('nameDestinationAccount') }}</span>
						</div>
						<div class="flex justify-end">
							<span class="text-base font-bold text-left">{{ item.destAccName }}</span>
						</div>
					</div>
				</div>
				<!-- Providers Data -->
			</div>
			<!-- Select Exist Provider -->

			<div
				v-else
				class="py-10"
			>
				<div class="mb-8 flex justify-center">
					<IconPostal class="text-8xl text-subtle-text-light dark:text-subtle-text-dark" />
				</div>
				<div class="my-8 text-right">
					<h5 class="mt-2 text-justify">
						{{ $t('createIdText') }}
					</h5>
				</div>
				<div class="w-full">
					<UButton
						size="lg"
						class="text-base font-medium px-6 py-2"
						block
						:loading="submitLoading"
						@click="submit"
					>
						{{ $t("createId") }}
					</UButton>
				</div>
			</div>
			<!-- Add New Id -->
		</div>

		<div
			v-else
			class="py-10"
		>
			<div class="h-full flex flex-col items-center justify-center">
				<div
					class="w-full md:w-96 flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="text-center">
						<div class="flex justify-center ">
							<IconUserAdd
								class="text-subtle-text-light dark:text-subtle-text-dark text-9xl text-center"
							/>
						</div>
						<div class="my-6">
							<p class="text-xs font-normal text-justify">
								{{ $t('addUserText') }}
							</p>
						</div>
						<UButton
							size="lg"
							class="text-base font-medium px-6 py-2"
							block
							to="/user"
						>
							{{ $t("userLevelSetting") }}
						</UButton>
					</div>
				</div>
			</div>
		</div>
		<!-- Need to auth id -->
	</div>
</template>

<script setup lang="ts">
import IconUserAdd from '~/assets/svg-icons/wallet/user-add.svg';
import IconPostal from '~/assets/svg-icons/wallet/postal.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import { userRepository } from '~/repositories/user.repository';
import { getValueByKey } from '~/utils/helpers';
import type { BankAccountDpi, BankAccountDpiListParams } from '~/types/definitions/user.types';
import type { KeyValue } from '~/types/definitions/common.types';

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();
const toast = useToast();
const { copyText } = useClipboard();

const provider = ref<string>('');
watch(() => provider.value, async (newValue) => {
	if (newValue) {
		console.log(newValue);
	}
});

const defaultId = ref<string>('');

const params = ref<BankAccountDpiListParams>({
	companyId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const bankAccountDpiListLoading = ref<boolean>(false);
const selectedBankAccountDpi = ref<BankAccountDpi[]>([]);
const bankAccountDpiList = ref<BankAccountDpi[]>([]);
const options = ref<KeyValue[]>([]);
const getBankAccountDpiList = async () => {
	try {
		bankAccountDpiListLoading.value = true;
		const { result } = await userRepo.getBankAccountDpiList(params.value);

		bankAccountDpiList.value = result.rows as BankAccountDpi[];
		// Show DropDown List
		if (bankAccountDpiList.value.length) {
			selectedBankAccountDpi.value.push(bankAccountDpiList.value[0]);
			options.value = bankAccountDpiList.value.map((item) => ({
				value: item.compName, key: String(item.compID),
			}));

			defaultId.value = options.value[0].key;
		}

		bankAccountDpiListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		bankAccountDpiListLoading.value = false;
	}
};

const submitLoading = ref<boolean>(false);
// const depositCryptoRequest = ref<DepositCryptoRequest | null>();
const submit = async () => {
	try {
		submitLoading.value = true;
		const { result } = await userRepo.getBankAccountDpiRequest();
		console.log(result);

		toast.add({
			title: useT('deposit'),
			description: useT('cardPrintSuccessfully'),
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
		submitLoading.value = false;
	}
};

const copyData = (item: BankAccountDpi) => {
	const result = `${useT('nameDestinationBank')}: ${item.destBankName}\n${useT('shabaNumber')}: ${item.destIban}\n${useT('depositId')}: ${item.destDepositId}\n${useT('nameDestinationAccount')}: ${item.destAccName}`;
	copyText(result);
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		authStore.fetchCurrentUser(true),
		getBankAccountDpiList(),
	]);
});
</script>
