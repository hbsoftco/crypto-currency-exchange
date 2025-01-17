<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 z-50">
			<div>
				<div class="flex justify-between items-center w-full text-center h-11 py-1 bg-hover2-light dark:bg-hover2-50 font-medium">
					<ULink
						to="/fast-trade?market=BTC_USDT"
						class="w-1/3 h-full flex justify-center items-center"
						:class="[activeMenu === 'quickTrade' ? 'bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-md': '']"
					>
						{{ $t('quickTrade') }}
					</ULink>
					<ULink
						to="/spot/BTC_USDT"
						class="w-1/3 h-full flex justify-center items-center"
						:class="[activeMenu === 'spot' ? 'bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-md': '']"
					>
						{{ $t('spot') }}
					</ULink>
					<ULink
						to=""
						class="w-1/3 h-full flex justify-center items-center"
						:class="[activeMenu === 'futures' ? 'bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-md': '']"
					>
						{{ $t('futures') }}
					</ULink>
				</div>
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	activeMenu: 'spot' | 'futures' | 'quickTrade';
}

defineProps<PropsDefinition>();
</script>
