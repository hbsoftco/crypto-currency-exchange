<template>
	<div>
		<section class="mx-4 my-5 ">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('spot') }}
					</h1>
					<IconEye class="text-xl cursor-pointer" />
				</div>

				<div class="flex justify-center md:justify-end mt-4 md:mt-0">
					<div class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('deposit') }}</span>
						<IconArrowUpGreen class="text-accent-green" />
					</div>
					<div class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark mx-2 cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('pickedUp') }}</span>
						<IconArrowDownRed class="text-accent-red" />
					</div>
					<div class="flex items-center py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('transfer') }}</span>
						<IconMoney class="text-accent-blue" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEye from '~/assets/svg-icons/wallet/eye.svg';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconMoney from '~/assets/svg-icons/wallet/money.svg';

definePageMeta({
	layout: 'wallet',
});

// const rows = ref([
// 	{ id: 1, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
// 	{ id: 2, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },
// 	{ id: 3, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
// 	{ id: 4, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },

// ]);
</script>
