<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class=" w-full md:w-[30rem] flex justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
				>
					<div class="w-full">
						<div class="w-full">
							<div class="hidden md:flex justify-between items-center py-2 border-b border-primary-gray-light dark:border-primary-gray-dark">
								<h3 class="text-base font-medium">
									{{ $t('inviteFriends') }}
								</h3>
							</div>
							<div class="md:hidden flex justify-between items-center py-2 border-b border-primary-gray-light dark:border-primary-gray-dark">
								<h3 class="text-base font-medium">
									{{ $t('inviteFriends') }}
								</h3>
								<IconClose
									class="text-3xl"
									@click="closeModal(false)"
								/>
							</div>
						</div>
						<div class="flex justify-center my-4">
							<vue-qrcode
								:value="link"
								:size="200"
								:level="'H'"
								:background="'#ffffff'"
								:foreground="'#000000'"
							/>
						</div>
					</div>
				</div>

				<div class="mt-6">
					<IconClose
						class="text-4xl cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

const link = ref<string>('https://bitland.io/auth/sign-up?inviter=123456');

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};

// const isAssetVisible = ref(false);

// const toggleAssetVisibility = () => {
// 	isAssetVisible.value = !isAssetVisible.value;
// };
</script>
