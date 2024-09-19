<template>
	<div>
		<section class="hidden md:block">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
			<div class="my-4 py-4 px-8 border  border-primary-gray-light dark:border-primary-gray-dark rounded-md">
				<ul class="text-sm font-normal list-disc pb-4">
					<li>{{ $t('manageAPIItem1') }}</li>
					<li>{{ $t('manageAPIItem2') }}</li>
					<li>{{ $t('manageAPIItem3') }}</li>
					<li>{{ $t('manageAPIItem4') }}</li>
				</ul>
				<UButton
					size="lg"
					class="text-base font-extrabold py-3 px-12 text-center"
					to="/account/manage-api/new-api"
				>
					{{ $t('createNewApi') }}
				</UButton>
			</div>
		</section>
		<section class="hidden md:block py-4 px-8  border  border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h2 class="text-base font-bold mb-3">
				{{ $t('apiKeyRecords') }}
			</h2>
			<table class="min-w-full my-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold">
							{{ $t('apiName') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('apiKey') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('access') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('ip') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('createTime') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('dayUntilExpiration') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('action') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in rows"
						:key="row.id"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2">
							{{ row.name }}
						</td>
						<td class="text-sm font-normal py-2">
							<div class="flex items-center">
								<IconCopy class="text-sm ml-1 cursor-pointer" />
								{{ useNumber(row.apiKey) }}
							</div>
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.access) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.ip) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.createTime) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.expire) }}
						</td>
						<td class="flex">
							<div class="mx-2">
								<span class="text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal cursor-pointer">{{ $t('edit') }}</span>
							</div>
							<div>
								<span class="text-accent-red text-xs font-normal cursor-pointer">{{ $t('delete') }}</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="block md:hidden text-center">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
			<NuxtImg
				src="/images/profile/api.png"
				alt="api"
				class="p-14"
			/>
			<p class="text-base font-bold">
				{{ $t('apiText') }}
			</p>
			<UButton
				size="lg"
				class="text-base font-extrabold py-3 px-12 text-center my-16"
			>
				{{ $t('goBackHomePage') }}
			</UButton>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';

definePageMeta({
	layout: 'account',
});
const rows = ref([
	{ id: 1, name: 'بیت لند ۱', apiKey: '6486461631', access: 'schvksvcdsjhcvdsjds35ds15151', ip: '99.4589.2554', createTime: '۱۴۰۱/۰۳/۲۱- ۱۴:۱۳', expire: '۱۴' },
	{ id: 2, name: 'بیت لند ۱', apiKey: '6486461631', access: 'schvksvcdsjhcvdsjds35ds15151', ip: '99.4589.2554', createTime: '۱۴۰۱/۰۳/۲۱- ۱۴:۱۳', expire: '۱۴' },
	{ id: 3, name: 'بیت لند ۱', apiKey: '6486461631', access: 'schvksvcdsjhcvdsjds35ds15151', ip: '99.4589.2554', createTime: '۱۴۰۱/۰۳/۲۱- ۱۴:۱۳', expire: '۱۴' },
	{ id: 4, name: 'بیت لند ۱', apiKey: '6486461631', access: 'schvksvcdsjhcvdsjds35ds15151', ip: '99.4589.2554', createTime: '۱۴۰۱/۰۳/۲۱- ۱۴:۱۳', expire: '۱۴' },
]);
</script>

<style scoped></style>
