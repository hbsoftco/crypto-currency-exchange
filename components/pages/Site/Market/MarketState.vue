<template>
	<div class="w-96 bg-hover-light dark:bg-hover-dark rounded-lg shadow-sm px-2 py-1">
		<div class="flex justify-between px-2 mb-1 py-4">
			<div>
				<span class="text-sm font-bold">{{ $t('hotTopics') }}</span>
			</div>
			<ULink to="">
				<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('more') }}</span>
			</ULink>
		</div>
		<ul class="px-2">
			<li class="flex justify-between my-4">
				<div class="flex justify-between text-left">
					<NuxtImg
						src="/images/delete/bitcoin.png"
						alt="icon state"
						class="w-5 h-5"
					/>
					<div class="text-sm font-normal mr-1">
						<span>PEPE</span>/
						<span>USDT</span>
					</div>
				</div>
				<div>
					<span class="text-sm font-normal">{{ useNumber('2.8389') }}</span>
				</div>
				<div>
					<span
						class="text-sm font-normal text-accent-green"
						dir="ltr"
					>{{ useNumber('+1.69%') }}</span>
				</div>
			</li>
			<li class="flex justify-between my-4">
				<div class="flex justify-between text-left">
					<NuxtImg
						src="/images/delete/bitcoin.png"
						alt="icon state"
						class="w-5 h-5"
					/>
					<div class="text-sm font-normal mr-1">
						<span>PEPE</span>/
						<span>USDT</span>
					</div>
				</div>
				<div>
					<span class="text-sm font-normal">{{ useNumber('2.8389') }}</span>
				</div>
				<div>
					<span
						class="text-sm font-normal text-accent-green"
						dir="ltr"
					>{{ useNumber('+1.69%') }}</span>
				</div>
			</li>
			<li class="flex justify-between my-4">
				<div class="flex justify-between text-left">
					<NuxtImg
						src="/images/delete/bitcoin.png"
						alt="icon state"
						class="w-5 h-5"
					/>
					<div class="text-sm font-normal mr-1">
						<span>PEPE</span>/
						<span>USDT</span>
					</div>
				</div>
				<div>
					<span class="text-sm font-normal">{{ useNumber('2.8389') }}</span>
				</div>
				<div>
					<span
						class="text-sm font-normal text-accent-green"
						dir="ltr"
					>{{ useNumber('+1.69%') }}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
</script>

<style scoped>

</style>
