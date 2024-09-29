<template>
	<div class="text-center">
		<div class="mb-8 flex justify-center">
			<IconPostal class="text-8xl" />
		</div>
		<div class="my-8 text-right">
			<p class="text-base font-bold">{{ $t('createIdText') }}</p>
		</div>
		<div class="w-full">
			<UButton
				size="lg"
				class="text-base font-medium px-6 py-2"
				to=""
			>
				{{ $t("createId") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconPostal from '~/assets/svg-icons/wallet/postal.svg';
</script>
