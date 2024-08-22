<template>
	<Auth title="signup">
		<UTabs :items="items">
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label) }}</span>
			</template>
			<template #item="{ item }">
				<div
					v-if="item.key === 'phoneNumber'"
					class="space-y-3"
				>
					<PagesAuthSignUpWithMobile />
				</div>
				<div
					v-else-if="item.key === 'email'"
					class="space-y-3"
				>
					<PagesAuthSignUpWithEmail />
				</div>
			</template>
		</UTabs>

		<div class="flex justify-center items-center mt-8">
			<div>
				<span class="ml-2 text-sm">{{ $t("haveAccount") }}</span>
				<ULink
					to="/auth/login"
					class="text-accent-green text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t('login') }}
				</ULink>
			</div>
		</div>
	</Auth>
</template>

<script setup>
import Auth from '../Auth.vue';

const items = [
	{
		key: 'phoneNumber',
		label: 'phoneNumber',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'email',
		label: 'email',
		content: 'And, this is the content for Tab2',
	},
];
</script>

<style></style>
