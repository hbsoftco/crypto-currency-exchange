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
					class="w-full md:w-[30rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('unverifiedSource')"
						/>
					</div>
					<div>
						<div class="flex justify-center text-center">
							<NuxtImg
								src="./images/svg/site/confirm.svg"
								alt="confirm"
								class="w-40 h-40"
							/>
						</div>
						<h3 class="text-base font-bold text-accent-green dark:text-accent-green my-8">
							{{ $t('verifiedSource') }}
						</h3>
						<div class="my-6">
							<p class="text-xs font-normal text-justify">
								جستجوی شما <span
									class="text-left"
									dir="ltr"
								>{{ staffId }}</span> یک منبع رسمی و مورد تایید در بیت لند
								می باشد.
							</p>
						</div>
						<div class=" text-base font-medium text-right border-t border-primary-gray-light dark:border-primary-gray-dark">
							<span>{{ $t('verificationModalTextOne') }}</span><br>
							<span>{{ $t('verificationModalTextTwo') }}</span>
						</div>
					</div>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

interface PropsDefinition {
	staffId: string;
}
const props = defineProps<PropsDefinition>();
console.log('staff-id', props.staffId);

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}
const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
