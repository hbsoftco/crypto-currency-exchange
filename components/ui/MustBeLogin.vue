<template>
	<div class="w-full min-h-60 m-auto text-center flex justify-center items-center">
		<div>
			<p v-if="text">
				{{ text }}
			</p>

			<div>
				<UButton
					to="/auth/login"
					class="h-12 my-4 px-10 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{ $t(btnText) }}</span>
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	btnText?: string;
	text?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	btnText: 'registerOrLogin',
});
</script>
