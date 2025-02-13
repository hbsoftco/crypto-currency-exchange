<template>
	<div>
		<section>
			<div class="block md:flex justify-between py-10 px-1 md:px-20 bg-hover-light dark:bg-hover-dark rounded-md">
				<div>
					<div>
						<span class="text-xl font-bold text-accent-red">{{ $t('transactionCompletedNotSuccessfully') }}</span>
					</div>
					<div class="text-base font-medium my-6">
						<span>{{ $t('referenceCode') }}:</span>
						<span>{{ useNumber('4362924369426') }}</span>
					</div>
					<div class="text-base font-medium">
						<p>{{ $t('transactionCompletedSuccessfullyText') }}</p>
					</div>
					<UButton
						size="lg"
						class="text-base font-medium px-6 py-2 my-6"
						to="/"
					>
						{{ $t("accountBalance") }}
					</UButton>
				</div>
				<div>
					<IconClose
						class="cursor-pointer rounded-full text-9xl bg-accent-red "
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
</script>
