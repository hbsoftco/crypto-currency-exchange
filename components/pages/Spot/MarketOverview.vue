<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm p-2">
		<div class="flex justify-start flex-row-reverse items-center">
			<div class="cursor-pointer px-2">
				<IconList class="text-lg" />
			</div>
			<div class="flex justify-start flex-row-reverse items-center">
				<div>
					<NuxtImg
						src="https://api-bitland.site/media/currency/BTC.png"
						alt="Brand Logo"
						class="w-6 h-6"
					/>
				</div>

				<div class="ml-2 text-left">
					<h4 class="font-bold text-base -mb-1">
						BTC/USDT
					</h4>
					<div>
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">بیت کوین</span>
					</div>
				</div>

				<div class="ml-14">
					<strong class="text-accent-green text-base font-bold">27,021.59</strong>
				</div>

				<div class="ml-5 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs ml-1 text-subtle-text-light dark:to-subtle-text-50">24H Change</span>
					</div>
					<UiChangePrice
						classes="text-xs font-normal ml-0"
						:show-percent="true"
						pl="pl-0"
						:change="parseFloat(String(+0.50))"
						:icon="false"
					/>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H High</span>
					</div>
					<div>
						<strong class="text-xs font-bold">27,148.72</strong>
					</div>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H Low</span>
					</div>
					<div>
						<strong class="text-xs font-bold">26,830.45</strong>
					</div>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H Volume (BTC)</span>
					</div>
					<div>
						<strong class="text-xs font-bold">26,830.45</strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconList from '~/assets/svg-icons/spot/list.svg';
</script>
