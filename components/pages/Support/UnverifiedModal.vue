<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-start overflow-auto"
		>
			<div>
				<div
					class="w-full md:w-[30rem] flex flex-col justify-center items-center my-auto text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
				>
					<div class="flex justify-between items-center px-2 pb-2 md:hidden w-full border-b border-primary-gray-light dark:border-primary-gray-dark">
						<h3 class="text-base font-medium">
							{{ $t('unverifiedSource') }}
						</h3>
						<IconClose
							class="text-3xl cursor-pointer"
							@click="closeModal(false)"
						/>
					</div>
					<div>
						<div class="flex justify-center text-center">
							<img
								src="/images/svg/site/warning.svg"
								alt="warning"
								class="w-40 h-40"
							>
						</div>
						<h3 class="text-base font-bold text-accent-red dark:text-accent-red my-8">
							{{ $t('unverifiedSource') }}
						</h3>
						<div class="my-6 px-2 md:px-0">
							<p class="text-xs font-normal text-justify">
								جستجوی شما <span
									class="text-left"
									dir="ltr"
								>{{ staffId }}</span> یک منبع رسمی و تایید شده در بیت‌لند نیست.
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
						<div class="px-2 md:px-0 pt-2 md:pt-0 text-base font-medium text-right border-t border-primary-gray-light dark:border-primary-gray-dark">
							<span>{{ $t('verificationModalTextOne') }}</span><br>
							<h5>
								مراقب کلاهبرداری باشید و با احتیاط عمل کنید. برای اطلاعات بیشتر لطفا به <ULink
									to="/help"
									class="text-accent-blue cursor-pointer"
								>
									{{ $t('guidCenter') }}
								</ULink> مراجعه نمایید.
							</h5>
						</div>
					</div>
				</div>
				<div class="mt-2 flex justify-center">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
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
