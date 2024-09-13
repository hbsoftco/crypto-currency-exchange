<template>
	<div>
		<div class="flex mb-12">
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border rounded-md',
					selectedButton === 'currentMonth'
						? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark bg-hover-light dark:bg-hover-dark'
						: 'border-none text-subtle-text-light dark:text-subtle-text-dark bg-hover-light dark:bg-hover-dark',
				]"
				@click="selectedButton = 'currentMonth'"
			>
				{{ $t('currentMonth') }}
			</button>
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
					selectedButton === 'previousMonth'
						? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark bg-hover-light dark:bg-hover-dark'
						: 'border-none text-subtle-text-light dark:text-subtle-text-dark bg-hover-light dark:bg-hover-dark',
				]"
				@click="selectedButton = 'previousMonth'"
			>
				{{ $t('previousMonth') }}
			</button>
		</div>
		<div class="mt-36  h-[40rem] py-4">
			<InvitersTable />
		</div>
	</div>
</template>

<script setup lang="ts">
import InvitersTable from '~/components/pages/Site/Account/TopUser/InvitersTable.vue';

const selectedButton = ref('traders');
</script>
