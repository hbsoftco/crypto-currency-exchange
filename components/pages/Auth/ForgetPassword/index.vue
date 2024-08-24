<template>
	<PagesAuth title="forgotPasswordNoQuestion">
		<div>
			<PagesAuthForgetPasswordGetCode />
		</div>

		<div class="flex justify-center items-center mt-8">
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
		</div>
	</PagesAuth>
</template>

<script setup>

</script>

<style></style>
