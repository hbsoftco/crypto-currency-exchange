<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<span
				class="text-base ml-1 font-semibold cursor-pointer group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			>
				{{ $t("futures") }}
			</span>
			<IconArrowDown
				v-if="!hover && showArrowDown"
				class="text-base text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all ml-0"
			/>
			<IconArrowUp
				v-if="hover"
				class="text-base group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark hover:fill-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all ml-0"
			/>
			<div
				v-if="hover"
				class="absolute top-4 -right-10 mt-1 p-6 opacity-0 group-hover:opacity-100 z-10"
				@mouseover="showMenu"
				@mouseleave="hideMenu"
			>
				<div
					class="w-72 hover:rounded-sm p-1 pl-0 bg-hover-light dark:bg-hover-dark shadow-lg rounded transition-opacity duration-200"
				>
					<ul class="flex flex-col space-y-2">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="relative flex justify-between hover:bg-primary-gray-light dark:hover:bg-hover2-50 border-transparent border-r-[3px] hover:border-r-[3px] hover:border-r-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-r-primary-yellow-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b last:border-b-0 duration-200 transition-all hover:rounded-r-md"
							@mouseover="showSubmenu(index)"
							@mouseleave="hideSubmenu(index)"
						>
							<div class="flex justify-between items-center w-full mx-3 p-2">
								<ULink
									to="#"
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
								v-if="item.hover && item.subItems"
								class="absolute top-0 right-full ml-2 shadow-lg overflow-hidden rounded z-10 transition-opacity duration-200 max-w-72 w-72"
							>
								<ul>
									<MenuTrade />
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
import MenuTrade from './MenuTrade.vue';

import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

const hover = ref(false);
const showArrowDown = ref(true);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
};

const menuItems = ref([
	{
		name: 'quickTrade',
		description: 'buyingSellingSpot',
		hover: false,
		subItems: [{ name: 'Sub-item 1' }, { name: 'Sub-item 2' }],
	},
	{
		name: 'professionalDeal',
		description: 'buyingSellingSpot',
		hover: false,
		subItems: [{ name: 'Sub-item 3' }, { name: 'Sub-item 4' }],
	},
	{
		name: 'listOrdersTransactions',
		description: 'buyingSellingSpot',
		hover: false,
	},
	{
		name: 'trialTransaction',
		description: 'buyingSellingSpot',
		hover: false,
	},
]);

const showSubmenu = (index) => {
	menuItems.value[index].hover = true;
};

const hideSubmenu = (index) => {
	menuItems.value[index].hover = false;
};
</script>
