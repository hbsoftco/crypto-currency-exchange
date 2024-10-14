<template>
	<UModal
		:overlay="overlay"
	>
		<UCard>
			<div class="space-y-2">
				<h4 class="border-b pb-2 font-bold border-primary-gray-light dark:border-primary-gray-dark">
					{{ title }}
				</h4>
				<div class="py-4">
					{{ body }}
				</div>
				<slot name="body" />

				<div>
					<UButton
						:loading="successLoadingBtn"
						@click="onSuccess"
					>
						{{ successBtn }}
					</UButton>
					<UButton
						class="mx-2"
						label="Button"
						color="gray"
						@click="onClose"
					>
						{{ closeBtn }}
					</UButton>
				</div>
			</div>
		</UCard>
	</UModal>
</template>

<script lang="ts" setup>
interface PropsDefinition {
	successBtn?: string;
	closeBtn?: string;
	successLoadingBtn?: boolean;
	overlay?: boolean;
	title?: string;
	body?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	successBtn: useT('confirm'),
	closeBtn: useT('cancel'),
	overlay: true,
});

interface EmitDefinition {
	(event: 'success' | 'close'): void;
}
const emit = defineEmits<EmitDefinition>();

const onSuccess = () => {
	emit('success');
};

const onClose = () => {
	emit('close');
};
</script>
