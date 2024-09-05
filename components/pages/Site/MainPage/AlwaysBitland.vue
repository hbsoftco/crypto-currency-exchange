<template>
	<div>
		<div class="flex justify-between py-8">
			<div class="max-w-[31rem] max-h-[31rem] h-[31rem] w-[31rem]">
				<NuxtImg
					src="/images/always-bitland.png"
					alt="always-bitland"
					class="w-full"
				/>
			</div>
			<div class="flex flex-col w-[33rem] pr-8">
				<span class="text-[2.5rem] font-black">
					{{ $t("alwaysBitland") }}
				</span>
				<p class="text-base font-bold mt-4 text-subtle-text-light dark:text-subtle-text-50">
					{{ $t('securityPriority') }}
				</p>
				<div class="text-base font-medium mt-10 leading-loose">
					<p>{{ $t('bitlandVision') }}</p>
					<p>{{ $t('bitlandPlatformSecurity') }}</p>
					<p>{{ $t('bitlandSupport') }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
