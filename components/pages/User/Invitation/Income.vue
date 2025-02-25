<template>
	<section class="py-0 md:py-12">
		<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<div class="block md:flex items-center justify-between my-8 px-0 md:px-8 border-none md:border border-primary-gray-light dark:border-primary-gray-dark">
				<div class="flex">
					<span class="text-2xl font-bold ml-4">{{ $t('dashboard') }}</span>
					<div class="my-1">
						<USelectMenu
							v-model="dateFilter"
							:options="dateItems"
							option-attribute="value"
							class="w-auto md:w-44"
							icon="heroicons:calendar-date-range-16-solid"
							:ui="{
								background: '',
								color: {
									white: {
										outline: ' bg-hover-light dark:bg-hover-dark',
									},
								},
							}"
						/>
					</div>
				</div>
				<div class="block md:flex">
					<div class="w-full md:w-72 ml-8 my-8 md:my-0 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
						<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
							<img
								src="/images/profile/money.png"
								alt="money"
								class="w-6 h-6 ml-1"
							>
							<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('totalIncome') }}
							</span>
						</div>
						<div
							class="flex justify-between pt-4 py-8"
							:title="String(referralBrief?.subject.coLY)"
						>
							<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('toman') }}
							</span>
							<span
								class="text-sm font-medium"
							>{{ dateFilter?.key }}</span>
						</div>
					</div>
					<div class="w-full md:w-72 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
						<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
							<IconUserInvite class="ml-1 text-2xl text-primary-yellow-light dark:text-primary-yellow-dark " />
							<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('allInvite') }}
							</span>
						</div>
						<div class="flex w-60 pt-4 py-8">
							<div class="w-36 pl-2 border-l-4 border-primary-gray-light dark:border-primary-gray-dark">
								<div class="flex justify-between">
									<span class="text-sm font-medium">{{ $t('direct') }}</span>
									<span class="text-sm font-bold">{{ directive }}</span>
								</div>
								<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
									<span class="text-sm font-medium">{{ $t('active') }}</span>
									<span class="text-sm font-bold">{{ referralBrief?.coDirectActive }}</span>
								</div>
								<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
									<span class="text-sm font-medium">{{ $t('inactive') }}</span>
									<span class="text-sm font-bold">{{ referralBrief?.coDirectInactive }}</span>
								</div>
							</div>
							<div class="w-36 pr-2">
								<div class="flex justify-between">
									<span class="text-sm font-medium">{{ $t('inDirect') }}</span>
									<span class="text-sm font-bold">{{ inDirective }}</span>
								</div>
								<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
									<span class="text-sm font-medium">{{ $t('active') }}</span>
									<span class="text-sm font-bold">{{ referralBrief?.coIndirectActive }}</span>
								</div>
								<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
									<span class="text-sm font-medium">{{ $t('inactive') }}</span>
									<span class="text-sm font-bold">{{ referralBrief?.coIndirectInactive }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import IconUserInvite from '~/assets/svg-icons/menu/user-fill.svg';
import type { ReferralBrief } from '~/types/definitions/user.types';
import type { KeyValue } from '~/types/definitions/common.types';

interface PropsDefinition {
	referralBrief: ReferralBrief;
}
const props = defineProps<PropsDefinition>();

const directive = computed(() => {
	const coDirectInactive = props.referralBrief?.coDirectInactive ?? 0;
	const coDirectActive = props.referralBrief?.coDirectActive ?? 0;

	return coDirectInactive + coDirectActive;
});

const inDirective = computed(() => {
	const coIndirectInactive = props.referralBrief?.coIndirectInactive ?? 0;
	const coIndirectActive = props.referralBrief?.coIndirectActive ?? 0;

	return coIndirectInactive + coIndirectActive;
});

const dateFilter = ref<KeyValue>({
	key: String(props.referralBrief?.subject.inLY),
	value: useT('lastYear'),
});
const dateItems = ref<KeyValue[]>([
	{
		key: String(props.referralBrief?.subject.inLY),
		value: useT('lastYear'),
	},
	{
		key: String(props.referralBrief?.subject.inL6M),
		value: useT('lastSixMonths'),
	},
	{
		key: String(props.referralBrief?.subject.inL3M),
		value: useT('lastThreeMonths'),
	},
	{
		key: String(props.referralBrief?.subject.inL1M),
		value: useT('lastOneMonths'),
	},
]);
</script>
