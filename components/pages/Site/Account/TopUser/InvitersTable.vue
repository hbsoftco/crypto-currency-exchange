<template>
	<div>
		<div class="px-1  md:px-10 pt-2 md:pt-0 mt-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr
						class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right"
					>
						<th class="text-sm font-bold py-3">
							{{ $t("rank") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("account") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("feeReceived") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("directInvitation") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("indirectInvitation") }}
						</th>
					</tr>
				</thead>

				<tbody>
					<InvitersTableRow
						v-for="(item, index) in items"
						:key="index"
						:rank="item.rank"
						:account="item.account"
						:fee-received="item.feeReceived"
						:direct-invitation="item.directInvitation"
						:indirect-invitation="item.indirectInvitation"
						:icon-src="item.iconSrc"
						:is-active="item.isActive"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import InvitersTableRow from '~/components/pages/Site/Account/TopUser/InvitersTableRow.vue';

const items = [
	{ rank: '1', account: '۰۹۱۹****۸۳۴', feeReceived: ' ۱۱۴,۰۰۰,۰۰۰', directInvitation: '۷۱۲', indirectInvitation: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: true },
	{ rank: '1', account: '۰۹۱۹****۸۳۴', feeReceived: ' ۱۱۴,۰۰۰,۰۰۰', directInvitation: '۷۱۲', indirectInvitation: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: false },
	{ rank: '1', account: '۰۹۱۹****۸۳۴', feeReceived: ' ۱۱۴,۰۰۰,۰۰۰', directInvitation: '۷۱۲', indirectInvitation: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: false },
];
</script>
