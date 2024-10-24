<template>
	<tr
		:class="[
			'border-b border-primary-gray-light dark:border-primary-gray-dark text-right  hover:bg-hover-light dark:hover:bg-hover-dark',
		]"
	>
		<td class="py-2">
			<div class="flex items-center">
				<img
					:src="iconSrc"
					alt="icon"
					class="w-8 h-8 ml-1"
				>
				<div class="text-right">
					<div
						class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<span class="text-base font-medium">
							{{ props.cryptocurrency }}
						</span>
					</div>
					<div>
						<span class="text-base font-medium">{{ props.symbol }}</span>
					</div>
				</div>
			</div>
		</td>

		<td class="py-2">
			<div
				v-for="(networkType, index) in props.networkTypes"
				:key="index"
			>
				{{ networkType }}
			</div>
		</td>

		<td class="py-2">
			<div
				v-for="(withdrawalFee, index) in props.withdrawalFees"
				:key="index"
			>
				{{ withdrawalFee }}
			</div>
		</td>

		<td class="py-2">
			<div
				v-for="(amount, index) in props.minimumWithdrawalAmounts"
				:key="index"
			>
				{{ amount }}
			</div>
		</td>

		<td class="py-2">
			<div
				v-for="(status, index) in props.networkStatuses"
				:key="index"
			>
				<span :class="status === 'active' ? 'text-green-500' : 'text-red-500'">
					{{ status === "active" ? $t("active") : $t("inactive") }}
				</span>
			</div>
		</td>

		<td class="py-2">
			<IconInfo
				class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
			/>
		</td>
	</tr>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';

const props = defineProps({
	cryptocurrency: String,
	symbol: String,
	iconSrc: {
		type: String,
		required: true,
	},
	networkTypes: {
		type: Array,
		required: true,
	},
	withdrawalFees: {
		type: Array,
		required: true,
	},
	minimumWithdrawalAmounts: {
		type: Array,
		required: true,
	},
	networkStatuses: {
		type: Array,
		required: true,
	},
});
</script>
