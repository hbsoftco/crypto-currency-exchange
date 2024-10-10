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
						<tr
							v-for="(item, index) in ticketList"
							:key="index"
							:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="pb-1"
						>
							<td class="text-xs font-normal py-1">
								<span>{{ useNumber(item.id) }}</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>{{ $t(item.header) }}</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>{{ useNumber(formatDateToIranTime(item.regTime)) }}</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>{{ $t(item.typeName) }}</span>
							</td>
							<td class="text-xs font-normal py-1">
								<span>{{ $t(item.stateName) }}</span>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="Number(params.pageNumber)"
						:page-count="20"
						:total="totalCount"
						:max="6"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
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
import { formatDateToIranTime } from '~/utils/date-time';
import { useNumber } from '~/composables/useNumber';
import { ticketRepository } from '~/repositories/ticketing.repository';
import type { GetTicketListParams } from '~/types/base.types';
import type { Ticket } from '~/types/response/ticketing.types';

const { $api } = useNuxtApp();
const ticketRepo = ticketRepository($api);

const totalCount = ref(0);

const params = ref<GetTicketListParams>({
	state: '',
	typeId: '',
	searchStatement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const response = await ticketRepo.getTicketList(params.value);
const ticketList = ref<Ticket[]>(response.result.rows);

const fetchTicketList = async () => {
	try {
		const { result } = await ticketRepo.getTicketList(params.value);

		totalCount.value = result.totalCount;
		ticketList.value = result.rows;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

onMounted(async () => {
	await fetchTicketList();
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await fetchTicketList();
};
</script>
