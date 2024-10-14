<template>
	<div>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<UContainer class="my-20">
			<div class="my-4 flex justify-between">
				<UiTitleWithBack :title="$t('deviceManagement')" />
				<ULink
					class="flex justify-between items-center py-2 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
					@click="openDetail"
				>
					<span class="text-base font-bold ml-1">
						{{ $t('linkDevice') }}
					</span>
					<IconQrCode class="text-base text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
			</div>
			<section>
				<div>
					<div class="w-full overflow-y-scroll">
						<table class="min-w-full py-6 text-right border border-primary-gray-light dark:border-primary-gray-dark">
							<thead>
								<tr class="pb-2 px-4 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
										{{ $t('devices') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('lastCheckTime') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('addressIp') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('place') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5" />
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, index) in 20"
									:key="index"
									class="py-3 px-4  border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
								>
									<td class="text-nowrap text-xs font-normal py-2">
										ff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										<IconClose
											class="cursor-pointer text-accent-red"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="flex justify-center py-4">
						<UPagination
							:model-value="10"
							:page-count="20"
							:total="40"
							:max="6"
							size="xl"
							ul-class="flex space-x-2 bg-blue-500 border-none"
							li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
							button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
							button-class-inactive="bg-green-700 hover:bg-gray-600"
							button-class-active="bg-blue-500"
							class="my-14"
						/>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import VerificationModal from '~/components/pages/Site/Account/Security/ManageDevice/VerificationModal.vue';

definePageMeta({
	layout: 'account-single',
});
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
