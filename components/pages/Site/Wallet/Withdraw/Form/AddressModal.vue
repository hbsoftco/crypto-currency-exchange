<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center"
			>
				<div
					class="flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('addressSelect')"
						/>
					</div>
					<div>
						<h3 class="text-xl font-bold">
							{{ $t('addressSelect') }}
						</h3>
						<div class="w-full md:w-96">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="search"
								placeholder=""
								icon="heroicons:magnifying-glass"
							/>
						</div>
						<div class="text-center">
							<div
								v-for="row in rows"
								:key="row.id"
								class="flex justify-between border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<span class="text-sm font-normal py-2 text-subtle-text-light dark:text-subtle-text-dark">
									{{ row.name }}
								</span>
								<span class="text-sm font-normal py-2">
									{{ row.address1 }}
								</span>
								<span class="text-sm font-normal py-2">
									{{ row.address2 }}
								</span>
							</div>
							<div class="flex justify-center">
								<UPagination
									:model-value="currentPage"
									:page-count="10"
									:total="100"
									:max="4"
									ul-class="flex space-x-2 bg-blue-500 border-none"
									li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
									button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
									button-class-inactive="bg-green-700 hover:bg-gray-600"
									button-class-active="bg-blue-500"
									class="my-4"
									@update:model-value="onPageChange"
								/>
							</div>
						</div>
					</div>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

const phoneOrEmail = ref('');
const rows = ref([
	{ id: 1, name: 'شبکه', address1: 'برچسب های آدرس', address2: 'آدرس برداشت' },
	{ id: 2, name: 'شبکه', address1: 'برچسب های آدرس', address2: 'آدرس برداشت' },
	{ id: 3, name: 'شبکه', address1: 'برچسب های آدرس', address2: 'آدرس برداشت' },
	{ id: 4, name: 'شبکه', address1: 'برچسب های آدرس', address2: 'آدرس برداشت' },
]);
const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}
const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
