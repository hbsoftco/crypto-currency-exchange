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
								src="./images/svg/site/warning.svg"
								alt="warning"
								class="w-40 h-40"
							/>
						</div>
						<h3 class="text-base font-bold text-accent-red dark:text-accent-red my-8">
							{{ $t('unverifiedSource') }}
						</h3>
						<div class="my-6">
							<p class="text-xs font-normal text-justify">
								جستجوی شما <span
									class="text-left"
									dir="ltr"
								>{{ staffId }}</span> یک منبع رسمی و تایید شده در بیت لند نیست.
							</p>
						</div>
						<div class="my-6 text-sm font-medium text-right p-2 bg-hover-light dark:bg-hover-dark text-primary-yellow-light dark:text-primary-yellow-dark">
							<span>{{ $t('unVerficationTipOne') }}:</span><br>
							<span>{{ $t('phoneNumber') }}: xx-xxxxxxxxx</span><br>
							<span>{{ $t('unVerficationTipTwo') }}: @xxxxx (با نماد @)</span><br>
							<span>{{ $t('unVerficationTipThree') }}: xxxx (بدون علامت @)</span><br>
							<span>{{ $t('diferent') }}: xxxx#xxxx (بدون علامت @)</span><br>
							<span>{{ $t('unVerficationTipFour') }}: {{ $t('unVerficationTipFourRes') }}</span><br>
							<span>{{ $t('unVerficationTipLast') }}</span><br>
						</div>
						<div class=" text-base font-medium text-right border-t border-primary-gray-light dark:border-primary-gray-dark">
							<span>{{ $t('verificationModalTextOne') }}</span><br>
							<h5>
								مراقب کلاهبرداری باشید و با احتیاط عمل کنید. برای اطلاعات بیشتر لطفا به <ULink
									to="/help-center"
									class="text-accent-blue cursor-pointer"
								>
									{{ $t('guidCenter') }}
								</ULink> مراجعه نمایید.
							</h5>
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
// import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';

interface PropsDefinition {
	staffId: string;
}
defineProps<PropsDefinition>();
const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
