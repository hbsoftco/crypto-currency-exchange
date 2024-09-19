<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center py-10 bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div class=" text-center bg-background-light dark:bg-background-dark rounded-md p-2 md:p-20 w-full md:w-[43.875rem] h-96 mb-6">
					<div class="block md:hidden w-full">
						<div class="flex justify-between py-3 items-center border-b border-primary-gray-light dark:border-primary-gray-dark">
							<h3 class="text-base font-medium">
								{{ $t("inviteFriends") }}
							</h3>
							<IconClose
								class="text-3xl"
								@click="closeModal(false)"
							/>
						</div>
					</div>
					<div class="text-right text-sm font-normal my-8 w-full text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark px-4 py-3">
						{{ $t('description') }}
					</div>
					<div class="my-8">
						<FormsFieldInput
							id="inviteCode"
							v-model="inviteCode"
							type="text"
							input-class="text-right"
							label="invitationCode"
							placeholder=""
							icon=""
							dir="rtl"
						/>
					</div>
					<UButton class="my-8 w-full bg-secondary-gray-light dark:bg-secondary-gray-dark text-primary-gray-light dark:text-primary-gray-dark flex justify-center items-center py-3">
						{{ $t('confirm') }}
					</UButton>
				</div>
				<IconClose
					class="text-4xl hidden md:block"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

const isOpen = ref(true);
const inviteCode = ref<string>('');

interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
