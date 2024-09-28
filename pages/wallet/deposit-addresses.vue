<template>
	<div>
		<Invalidate
			v-if="showDetail"
			@close="closeDetail"
		/>
		<DepositClaim
			v-if="showDepositClaim"
			@close="closeDepositClaim"
		/>
		<section>
			<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('depositAddresses') }}
				</h1>
			</div>
			<div>
				<FilterSearch />
			</div>
			<div class="w-full overflow-y-scroll">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
								{{ $t('network') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('validityDate') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('status') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('address') }}
							</th>
							<th class="text-sm font-normal  py-2" />
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ $t(row.network) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(row.validityDate) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(row.status) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								<div class="flex">
									<IconQrCode class="text-base text-subtle-text-light dark:text-subtle-text-dark" />
									<span class="w-32 truncate">{{ useNumber(row.address) }}</span>
								</div>
							</td>
							<td
								class="text-xs font-normal py-2  text-primary-yellow-light dark:text-primary-yellow-dark"
							>
								<span
									class="px-4 cursor-pointer text-nowrap"
								>
									{{ $t('extension') }}
								</span>
								<span
									class="px-4 cursor-pointer text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark"
									@click="openDetail"
								>
									{{ $t('invalidate') }}
								</span>
								<span
									class="px-4 cursor-pointer text-nowrap "
									@click="openDepositClaim"
								>
									{{ $t('depositClaim') }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import FilterSearch from '~/components/pages/Site/Wallet/Menu/Deposit/FilterSearch.vue';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import DepositClaim from '~/components/pages/Site/Wallet/Menu/Deposit/DepositClaim.vue';
import Invalidate from '~/components/pages/Site/Wallet/Menu/Deposit/Invalidate.vue';

definePageMeta({
	layout: 'wallet',
});
const rows = ref([
	{ id: 1, network: 'BSC BEP20(BSC)', validityDate: '۱۴۰۱/۰۱/۲۳ - ۱۴:۳۴', status: 'فعال', address: '0x5e676140cdf57c4e25db49b640f56b6ec64eeb75' },
	{ id: 2, network: 'BSC BEP20(BSC)', validityDate: '۱۴۰۱/۰۱/۲۳ - ۱۴:۳۴', status: 'فعال', address: '0x5e676140cdf57c4e25db49b640f56b6ec64eeb75' },
	{ id: 3, network: 'BSC BEP20(BSC)', validityDate: '۱۴۰۱/۰۱/۲۳ - ۱۴:۳۴', status: 'فعال', address: '0x5e676140cdf57c4e25db49b640f56b6ec64eeb75' },

]);
const showDetail = ref(false);
const showDepositClaim = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};

const openDepositClaim = () => {
	showDepositClaim.value = true;
};

const closeDepositClaim = () => {
	showDepositClaim.value = false;
};
</script>
