<template>
	<div>
		<div class="flex group relative items-center space-x-2">
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
				class="absolute top-[0.85rem] -right-10 mt-1 hidden group-hover:block p-6 z-10"
			>
				<div
					class="w-72 hover:rounded-sm p-1 pl-0 bg-hover-light dark:bg-hover-dark shadow-lg rounded"
				>
					<ul class="flex flex-col">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="relative group/item flex justify-between hover:bg-primary-gray-light dark:hover:bg-hover2-50 border-transparent border-r-[3px] hover:border-r-[3px] hover:border-r-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-r-primary-yellow-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b last:border-b-0 duration-200 transition-all hover:rounded-r-md"
							@mouseover="showSubmenu(index)"
							@mouseleave="delayedHideSubmenu(index)"
						>
							<div class="flex justify-between items-center w-full mx-3 p-2">
								<ULink
									:to="checkPathLink(item.link, item.ignore)"
									class="flex justify-between items-start w-full"
								>
									<div class="text-base ml-2">
										<span class="text-base font-medium">{{ $t(item.name) }}</span>
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
								v-if="item.hover && item.subItems"
								class="absolute top-0 right-full ml-2 shadow-lg overflow-hidden rounded z-10 max-w-72 w-72"
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
		type: 'fast-trade',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		subItems: [{ name: 'Sub-item 1' }, { name: 'Sub-item 2' }],
		timeout: null,
		deley: false,
	},
	{
		name: 'professionalDeal',
		type: 'spot',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		subItems: [{ name: 'Sub-item 3' }, { name: 'Sub-item 4' }],
		timeout: null,
		deley: true,
	},
	{
		name: 'listOrdersTransactions',
		description: 'buyingSellingSpot',
		ignore: false,
		hover: false,
		link: '/spot/list',
		timeout: null,
		deley: false,

	},
	{
		name: 'trialTransaction',
		description: 'buyingSellingSpot',
		ignore: true,
		hover: false,
		link: '/spot/list',
		timeout: null,
		deley: false,
	},
]);

const showSubmenu = (index) => {
	if (menuItems.value[1].hover && index === 0) {
		menuItems.value[1].hover = false;
		clearTimeout(menuItems.value[1].timeout);
	}

	clearTimeout(menuItems.value[index].timeout);
	menuItems.value[index].hover = true;
};

const delayedHideSubmenu = (index) => {
	if (menuItems.value[index].deley) {
		menuItems.value[index].timeout = setTimeout(() => {
			menuItems.value[index].hover = false;
		}, 500);
	}
	else {
		menuItems.value[index].hover = false;
	}
};
</script>
