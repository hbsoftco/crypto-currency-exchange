<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center "
			>
				<div
					class="overflow-y-scroll w-full md:w-[45rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 pt-[40rem] md:pt-96 mt-20"
				>
					<div class="flex md:hidden justify-between py-3 items-center ">
						<UiTitleWithBack
							:title="$t('orderDetails')"
							:back-btn="true"
						/>
					</div>
					<span class="text-xl font-bold hidden md:block">{{ $t('orderDetails') }}</span>
					<section>
						<div class="flex justify-between px-1 md:px-16 my-4">
							<div class="flex">
								<NuxtImg
									src="/images/delete/bitcoin.png"
									alt="bitcoin"
									class="w-16 h-16"
								/>
								<div class="mr-2">
									<span class="text-base font-bold">BabyDoge</span>
									<div class="mt-1 px-2 py-1 text-accent-red bg-[#33181D] rounded-md">
										{{ $t('sell') }}
									</div>
								</div>
							</div>
							<div class="flex flex-col text-left">
								<span class="text-sm font-medium">{{ useNumber('۰۲/۰۳/۲۴ - ۲۳:۴۵:۵۸') }}</span>
								<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}</span>
							</div>
						</div>
					</section>

					<section>
						<div class="mb-12 grid grid-cols-2 md:grid-cols-3 gap-4">
							<div class="flex m-2">
								<IconType class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('type') }}:</span>
									<span class="text-sm font-bold">بازار</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۷۳۸۳۵۳۸۴۶۸۴') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('value') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۸۶۳۸۵ USDT') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('stopPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('00') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('unitPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('00') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۴۵۶۳۸۵۶۸') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAmount') }}:</span>
									<span class="text-sm font-bold">{{ $t('۳۷۸۶۳۶۳۶') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconAnalytics class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amountFilled') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۶۴۶۴۳۶۳') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۱۰۰٪  پرشده') }}</span>
								</div>
							</div>
						</div>
					</section>

					<section>
						<div class="flex justify-center mb-4 ">
							<h3 class="text-2xl font-bold">
								{{ $t('transactionDetails') }}
							</h3>
						</div>
						<div class="flex justify-start py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<span class="text-sm font-bold ">{{ $t('firstTransaction') }}</span>
						</div>
						<div class="mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
							<div class="flex m-2">
								<IconDate class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(' ۰۲/۰۳/۲۴ - ۲۳:۴۵:۵۸') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۵۶۸۹۳۵۶') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('fee') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۸۶۳۸۵ USDT') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">پایان یافته</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAmount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
						</div>
						<div class="flex justify-start py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<span class="text-sm font-bold ">{{ $t('secondTransaction') }}</span>
						</div>
						<div class="mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
							<div class="flex m-2">
								<IconDate class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(' ۰۲/۰۳/۲۴ - ۲۳:۴۵:۵۸') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۵۶۸۹۳۵۶') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('fee') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۸۶۳۸۵ USDT') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">پایان یافته</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex m-2">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAmount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconType from '~/assets/svg-icons/spot/academic-level.svg';
import IconCategory from '~/assets/svg-icons/spot/category.svg';
import IconRecepie from '~/assets/svg-icons/spot/recepie.svg';
import IconAnchor from '~/assets/svg-icons/spot/anchor.svg';
import IconAnalytics from '~/assets/svg-icons/spot/analytics.svg';
import IconCoin from '~/assets/svg-icons/spot/coin.svg';
import IconSalary from '~/assets/svg-icons/spot/salary.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import { useNumber } from '~/composables/useNumber';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
