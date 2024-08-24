<template>
	<PagesAuth title="login">
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
					<PagesAuthLoginWithMobile />
				</div>
				<div
					v-else-if="item.key === 'email'"
					class="space-y-3"
				>
					<PagesAuthLoginWithEmail />
				</div>
				<div
					v-else-if="item.key === 'qrCode'"
					class="space-y-3"
				>
					<PagesAuthLoginWithQRCode />
				</div>
			</template>
		</UTabs>

		<div class="flex justify-between items-center mt-8">
			<div>
				<span class="ml-2 text-sm">{{ $t("noAccount") }}</span>
				<ULink
					to="/auth/sign-up"
					class="text-accent-green text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t('signup') }}
				</ULink>
			</div>
			<div>
				<ULink
					to="/auth/forget-password"
					class="text-accent-red text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t('forgotPassword') }}
				</ULink>
			</div>
		</div>
	</PagesAuth>
</template>

<script setup>
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
	{
		key: 'qrCode',
		label: 'qrCode',
		content: 'Finally, this is the content for Tab3',
	},
];
</script>

<style></style>
