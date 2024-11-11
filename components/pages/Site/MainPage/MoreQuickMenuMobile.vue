<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class=" w-full h-full flex flex-col rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
			>
				<div class="flex items-center my-1">
					<IconArrowRight
						class="text-xl cursor-pointer"
						@click="closeModal(false)"
					/>
					<h6>{{ $t('quickAccess') }}</h6>
				</div>
				<div class="my-2">
					<h4>{{ $t('currencyDeposit') }}:</h4>
					‌<div class="grid grid-cols-3 gap-1">
						<ULink
							class=""
							to="/wallet/deposit"
						>
							<span>{{ $t('deposit') }}</span>
						</ULink>
						<ULink
							class=""
							to="/wallet/deposit"
						>
							<span>{{ $t('deposit') }}</span>
						</ULink>
						<ULink
							class=""
							to="/wallet/deposit"
						>
							<span>{{ $t('deposit') }}</span>
						</ULink>
					</div>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';

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
