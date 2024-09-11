<template>
	<tr
		:class="[
			'border-b border-primary-gray-light dark:border-primary-gray-dark text-right',
			isEven ? 'bg-hover-light dark:bg-hover-dark' : 'bg-background-light dark:bg-background-dark',
		]"
	>
		<td class="py-2">
			<div class="flex items-center">
				<NuxtImg
					:src="iconSrc"
					alt="icon"
					class="w-8 h-8 ml-1"
				/>
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

		<!-- نوع شبکه‌ها -->
		<td class="py-2">
			<div
				v-for="(networkType, index) in props.networkTypes"
				:key="index"
			>
				{{ networkType }}
			</div>
		</td>

		<!-- حداقل مقدار سپرده‌گذاری‌ها -->
		<td class="py-2">
			<div
				v-for="(amount, index) in props.minimumDepositAmounts"
				:key="index"
			>
				{{ amount }}
			</div>
		</td>

		<!-- وضعیت شبکه‌ها -->
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

		<!-- آیکون اطلاعات -->
		<td class="py-2">
			<IconInfo
				class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
			/>
		</td>
	</tr>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';

// تعریف props برای دریافت داده‌ها از والد
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
	minimumDepositAmounts: {
		type: Array,
		required: true,
	},
	networkStatuses: {
		type: Array,
		required: true,
	},
	isEven: {
		type: Boolean,
		required: true,
	},
});
</script>
