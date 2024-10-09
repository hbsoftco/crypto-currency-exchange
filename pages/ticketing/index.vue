<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div class="flex flex-col">
						<h1 class="text-4xl font-black">
							{{ $t('ticketList') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('ticketTitle') }}</span>
						<div>
							<UButton
								size="lg"
								class="text-base font-medium px-6 py-2"
								to="/ticketing/create"
							>
								{{ $t("addNewTicket") }}
							</UButton>
						</div>
					</div>
					<div>
						<NuxtImg
							src="/images/svg/ticketing.svg"
							alt="ticketing"
							class="w-80 h-80"
						/>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<table class="min-w-full p-6 text-right">
					<thead>
						<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark">
							<th class="p-1 text-sm font-bold">
								{{ $t('code') }}
							</th>
							<th class="p-1 text-sm font-bold">
								{{ $t('title') }}
							</th>
							<th class="p-1 text-sm font-bold">
								{{ $t('date') }}
							</th>
							<th class="p-1 text-sm font-bold">
								{{ $t('type') }}
							</th>
							<th class="p-1 text-sm font-bold">
								{{ $t('status') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<!-- <tr
							v-for="(item, index) in markets"
							:key="index"
							:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="pb-1"
						> -->
						<tr>
							<td class="text-xs font-normal py-1">
								<span>ddddd</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>ddddd</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>ddddd</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>ddddd</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>ddddd</span>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="currentPage"
						:page-count="10"
						:total="100"
						:max="4"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
						button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
						button-class-inactive="bg-green-700 hover:bg-gray-600"
						button-class-active="bg-blue-500"
						class="my-14"
						@update:model-value="onPageChange"
					/>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
