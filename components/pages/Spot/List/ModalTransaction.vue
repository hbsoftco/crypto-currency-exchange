<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center py-0 md:py-6 bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div class="overflow-y-scroll text-center bg-background-light dark:bg-background-dark rounded-md py-4 md:py-8 px-2 w-full md:w-[45rem] h-full md:h-auto mb-0 md:mb-4 mt-0">
					<div class="flex md:hidden justify-between py-3 items-center ">
						<UiTitleWithBack
							:title="$t('orderDetails')"
							:back-btn="true"
						/>
					</div>

					<section>
						<div class=" hidden md:flex justify-center mb-4 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<h3 class="text-2xl font-bold">
								{{ $t('transactionDetails') }}
							</h3>
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
				<IconClose
					class="text-4xl hidden md:block"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconCategory from '~/assets/svg-icons/spot/category.svg';
import IconRecepie from '~/assets/svg-icons/spot/recepie.svg';
import IconAnchor from '~/assets/svg-icons/spot/anchor.svg';
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
