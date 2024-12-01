<template>
	<div class="fixed z-20 bottom-4 space-y-2 top-72 right-8">
		<div class="mb-6">
			<button
				:aria-label="$t('sendTicket')"
				class="rounded-full shadow-sm w-12 h-12 bg-hover-light dark:bg-hover-dark flex justify-center items-center"
				@click="router.push(checkPathLink('/ticketing', false))"
			>
				<IconEmail class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark" />
			</button>
		</div>
		<div>
			<button
				:aria-label="$t('guidCenter')"
				class="rounded-full shadow-sm w-12 h-12 bg-hover-light dark:bg-hover-dark flex justify-center items-center"
				@click="router.push('/help-center')"
			>
				<IconSupport class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconEmail from '~/assets/svg-icons/email.svg';
import IconSupport from '~/assets/svg-icons/support.svg';

const router = useRouter();
const { checkPathLink } = useLinkManager();
</script>
