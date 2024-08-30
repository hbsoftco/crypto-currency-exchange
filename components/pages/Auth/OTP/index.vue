<template>
	<PagesAuth
		v-if="title"
		:title="title"
	>
		<div>
			<PagesAuthOTPLoginOTP type="type" />
		</div>

		<div class="flex justify-center items-center mt-8">
			<div>
				<span class="ml-2 text-sm">{{ $t("needAlternativeVerification") }}</span>
				<ULink
					to="/auth/sign-up"
					class="text-primary-yellow-light dark:text-primary-yellow-dark text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t("clickHere") }}
				</ULink>
			</div>
		</div>
	</PagesAuth>
</template>

<script setup lang="ts">
const route = useRoute();

const action = ref<string | undefined>(route.query.action as string || '');
const type = ref<string | undefined>(route.query.type as string || '');

const title = ref<string>('');

if (
	action.value === 'login'
	&& (type.value === 'email' || type.value === 'mobile')
) {
	title.value = 'loginToAccount';
}
</script>
