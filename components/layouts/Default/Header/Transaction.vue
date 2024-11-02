<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
		>
			<span
				class="text-base ml-1 font-semibold cursor-pointer group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			>
				{{ $t("transaction") }}
			</span>
			<IconArrowDown
				class="text-base block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<IconArrowUp
				class="text-base hidden group-hover:block group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark hover:fill-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<div
				class="absolute top-4 -right-10 mt-1 hidden group-hover:block p-6 opacity-0 group-hover:opacity-100 z-10"
			>
				<div
					class="w-72 hover:rounded-sm p-1 pl-0 bg-hover-light dark:bg-hover-dark shadow-lg rounded transition-opacity duration-200"
				>
					<ul class="flex flex-col">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="relative group/item flex justify-between hover:bg-primary-gray-light dark:hover:bg-hover2-50 border-transparent border-r-[3px] hover:border-r-[3px] hover:border-r-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-r-primary-yellow-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b last:border-b-0 duration-200 transition-all hover:rounded-r-md"
						>
							<div class="flex justify-between items-center w-full mx-3 p-2">
								<ULink
									:to="checkPathLink(item.link, item.ignore)"
									class="flex justify-between items-start w-full"
								>
									<div class="text-base ml-2">
										<span class="text-base font-medium">{{
											$t(item.name)
										}}</span>
										<p class="text-xs font-normal text-subtle-text mt-2">
											{{ $t(item.description) }}
										</p>
									</div>
									<IconArrowLeft
										v-if="item.subItems && item.subItems.length"
										class="mt-1"
									/>
								</ULink>
							</div>

							<!-- Submenu -->
							<div
								v-if="item.subItems"
								class="absolute top-0 right-full hidden group-hover/item:block ml-2 shadow-lg overflow-hidden rounded z-10 transition-opacity duration-200 max-w-72 w-72"
							>
								<ul>
									<SkipHydration>
										<MenuTrade :type="item.type" />
									</SkipHydration>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

const MenuTrade = defineAsyncComponent(() => import('~/components/layouts/Default/Header/MenuTrade.vue'));

const { checkPathLink } = useLinkManager();

const menuItems = ref([
	{
		name: 'quickTrade',
		type: 'spot',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		subItems: [{ name: 'Sub-item 1' }, { name: 'Sub-item 2' }],
	},
	{
		name: 'professionalDeal',
		type: 'fast-trade',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		subItems: [{ name: 'Sub-item 3' }, { name: 'Sub-item 4' }],
	},
	{
		name: 'listOrdersTransactions',
		description: 'buyingSellingSpot',
		ignore: false,
		hover: false,
		link: '/spot/list',
	},
	{
		name: 'trialTransaction',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		link: '/spot/list',
	},
]);
</script>
