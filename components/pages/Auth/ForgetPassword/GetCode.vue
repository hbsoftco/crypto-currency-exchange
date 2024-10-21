<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ $t('enterPhoneOrEmail') }}
			</p>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="phoneOrEmail"
				placeholder=""
				icon=""
				dir="ltr"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
			>
				{{ $t('sendCode') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
const phoneOrEmail = ref<string>('');
// const v$ = useVuelidate(ticketDtoRules, ticketDto);
</script>
