<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-3 md:my-10">
					<div class="flex flex-col">
						<h1 class="text-lg md:text-4xl font-bold md:font-black">
							{{ $t('ticketList') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('ticketTitle') }}</span>
						<div>
							<UButton
								size="lg"
								class="text-base font-medium px-6 py-2"
								to="/support/tickets/add"
							>
								{{ $t("addNewTicket") }}
							</UButton>
						</div>
					</div>
					<div>
						<img
							src="/images/svg/ticketing.svg"
							alt="ticketing"
							class="w-72 h-40 md:w-80 md:h-80"
						>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div v-if="isMobile">
					<div
						v-for="(item, index) in tickets"
						:key="index"
						class="bg-hover-light dark:bg-hover-dark rounded mb-2 p-2 shadow-sm text-sm"
					>
						<div class="mb-3">
							<span class="text-sm text-subtle-text-light dark:text-subtle-text-50">{{ item.id }}</span>
							<span class="mx-1">-</span>
							<span class="cursor-pointer font-semibold">{{ item.header }}</span>
						</div>
						<div class="flex justify-between items-center">
							<div>
								<div class="mb-1.5 text-xs">
									<span class="text-subtle-text-light dark:text-subtle-text-50 ml-1">{{ $t('type') }}:</span>
									<span>{{ item.typeName }}</span>
								</div>
								<div class="text-xs">
									<span class="text-subtle-text-light dark:text-subtle-text-50 ml-1">{{ $t('status') }}:</span>
									<span>{{ item.stateName }}</span>
								</div>
							</div>
							<div
								class="text-xs"
								dir="ltr"
							>
								<div class="mb-1.5">
									{{ formatDateToIran(item.regTime) }}
								</div>
								<div>{{ formatDateToIranTime(item.regTime) }}</div>
							</div>
						</div>
					</div>
				</div>
				<table
					v-else
					class="min-w-full p-6 text-right"
				>
					<thead>
						<tr class="py-4 text-sm font-bold rounded-t text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark">
							<th class="py-3 pr-4 p-1 rounded-tr">
								{{ $t('code') }}
							</th>
							<th class="py-3 pr-2 p-1">
								{{ $t('title') }}
							</th>
							<th class="py-3 pr-2 p-1">
								{{ $t('date') }}
							</th>
							<th class="py-3 pr-2 p-1">
								{{ $t('type') }}
							</th>
							<th class="py-3 pr-2 p-1 rounded-tl">
								{{ $t('status') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-if="ticketsLoading">
							<tr
								v-for="n in 6"
								:key="n"
							>
								<td class="py-4">
									<USkeleton class="h-4 w-14 md:w-24" />
								</td>
								<td class="py-4">
									<USkeleton class="h-4 w-14 md:w-24" />
								</td>
								<td class="py-4">
									<USkeleton class="h-4 w-12 md:w-20" />
								</td>
								<td class="py-4">
									<USkeleton class="h-4 w-36" />
								</td>
								<td class="py-4">
									<USkeleton class="h-4 w-36" />
								</td>
							</tr>
						</template>
						<tr
							v-for="(item, index) in tickets"
							:key="index"
							class="pb-1 odd:bg-hover2-light dark:odd:bg-hover2-dark text-right text-sm font-normal"
						>
							<td class="py-2.5 pr-4">
								<span>{{ item.id }}</span>
							</td>
							<td class="py-2.5 pr-1">
								<span
									class="cursor-pointer font-semibold"
									@click="ticketDetail(item)"
								>{{ item.header }}</span>
							</td>
							<td class="py-2.5 pr-1">
								<span dir="ltr">{{ formatDateToIranTime(item.regTime) }}</span>
							</td>
							<td class="py-2.5 pr-1">
								<span>{{ item.typeName }}</span>
							</td>
							<td class="py-2.5 pr-1">
								<span>{{ item.stateName }}</span>
							</td>
						</tr>
					</tbody>
				</table>
				<template v-if="!tickets?.length && !ticketsLoading">
					<UiNothingToShow />
				</template>
				<div class="flex justify-center py-4">
					<UPagination
						v-if="totalCount > itemsPerPage"
						:model-value="Number(ticketsParams.pageNumber)"
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
import { formatDateToIran } from '~/utils/persian-date';
import { formatDateToIranTime } from '~/utils/date-time';
import { userRepository } from '~/repositories/user.repository';
import type { Ticket, TicketListParams } from '~/types/definitions/user.types';

definePageMeta({
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const router = useRouter();

const ticketDetail = (ticket: Ticket) => {
	router.push({
		path: `/support/tickets/${ticket.id}`,
		query: { regTime: ticket.regTime, header: ticket.header },
	});
};

const totalCount = ref(0);
const itemsPerPage = 10;

const tickets = ref<Ticket[]>();
const ticketsLoading = ref<boolean>(true);
const ticketsParams = ref<TicketListParams>({
	state: '',
	typeId: '',
	searchStatement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const getTicketList = async () => {
	ticketsLoading.value = true;
	try {
		const { result } = await userRepo.getTicketList(ticketsParams.value);

		tickets.value = result.rows as Ticket[];
	}
	catch (error) {
		console.log(error);
	}
	finally {
		ticketsLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await getTicketList();
});

const onPageChange = async (newPage: number) => {
	ticketsParams.value.pageNumber = String(newPage);
	await getTicketList();
};
</script>
