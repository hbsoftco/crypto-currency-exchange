<template>
	<div class="w-full relative bg-hover-light dark:bg-hover-dark rounded-sm p-2">
		<div class="flex justify-between items-center">
			<div class="flex justify-start items-center">
				<ULink
					to=""
					class="mr-2"
				>
					<IconDots
						class="text-xl"
						@click="openSlide=true"
					/>
					<USlideover
						v-model="openSlide"
						prevent-close
						side="top"
						:ui="{
							height: 'h-screen max-h-36',
						}"
					>
						<UCard
							class="flex flex-col flex-1"
							:ui="{ body: {
									base: 'flex-1',
									padding: 'px-0' },
								ring: '',

							}"
						>
							<template #header>
								<div class="flex justify-end items-center">
									<UButton
										color="gray"
										variant="ghost"
										icon="i-heroicons-x-mark-20-solid"
										class="-my-1 outline-none"
										@click="openSlide=false"
									/>
								</div>
							</template>
							<div class="grid grid-cols-4 gap-4 px-2">
								<ULink class="flex flex-col justify-center text-center items-center">
									<div class="flex items-center justify-center bg-hover-light dark:bg-hover-dark w-10 h-10 rounded-full">
										<img
											src="/images/svg/deposit.svg"
											alt="deposit"
											class="w-6 h-6"
										>
									</div>
									<span class="text-sm font-medium">{{ $t('deposit') }}</span>
								</ULink>
								<ULink class="flex flex-col justify-center text-center items-center">
									<div class="flex items-center justify-center bg-hover-light dark:bg-hover-dark w-10 h-10 rounded-full">
										<img
											src="/images/svg/transfer.svg"
											alt="transform"
											class="w-6 h-6"
										>
									</div>
									<span class="text-sm font-medium">{{ $t('transfer') }}</span>
								</ULink>
								<ULink
									to="/user/preference"
									class="flex flex-col justify-center text-center items-center"
								>
									<div class="flex items-center justify-center bg-hover-light dark:bg-hover-dark w-10 h-10 rounded-full">
										<img
											src="/images/svg/setting.svg"
											alt="setting"
											class="w-6 h-6"
										>
									</div>
									<span class="text-sm font-medium">{{ $t('setting') }}</span>
								</ULink>
								<ULink
									to="/help"
									class="flex flex-col justify-center text-center items-center"
								>
									<div class="flex items-center justify-center bg-hover-light dark:bg-hover-dark w-10 h-10 rounded-full">
										<img
											src="/images/svg/helpcenter.svg"
											alt="helpcenter"
											class="w-6 h-6"
										>
									</div>
									<span class="text-sm font-medium">{{ $t('helpCenter') }}</span>
								</ULink>
							</div>
							<div class="flex items-center mt-4 pt-4 px-4">
								<IconStar class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<span class="text-sm font-medium mr-1">{{ `افزودن ${spotStore.currency}${spotStore.quote} به علاقه‌مندی‌ها` }}</span>
							</div>
						</UCard>
					</USlideover>
				</ULink>

				<ULink
					:to="`/spot/market-detail/${spotStore.currency}_${spotStore.quote}`"
					class="mx-4"
				>
					<img
						:src="`/images/svg/candle-${!isDark? 'dark':'light'}.svg`"
						alt="candle-light"
						class="w-6 h-6"
					>
				</ULink>

				<ULink
					to=""
					class="bg-[#cfddff] dark:bg-[#16306e] text-[#2196f3] rounded-sm pl-1 py-1 flex items-center"
					dir="ltr"
				>
					<span class="text-xs">110X</span>
					<span>
						<IconArrowRight class="text-lg" />
					</span>
				</ULink>
			</div>
			<div class="flex justify-start flex-row-reverse items-center">
				<div
					class="cursor-pointer px-2"
					@click="openSearchBox"
				>
					<IconList class="text-2xl" />
				</div>
				<div class="flex justify-start flex-row-reverse items-center">
					<div>
						<img
							v-if="spotStore.currency"
							:src="`https://api-bitland.site/media/currency/${spotStore.currency}.png`"
							alt="Brand Logo"
							class="w-6 h-6"
							@error="handleImageError"
						>
					</div>

					<div class="ml-2 text-left">
						<h4 class="font-bold text-base -mb-1">
							{{ `${spotStore.currency}/${spotStore.quote}` }}
						</h4>
					</div>

					<div class="ml-1 text-left">
						<UiChangePrice
							classes="text-xs font-normal ml-0"
							:show-percent="true"
							:bg-color="false"
							pl="pl-0"
							:change="parseFloat(String(spotStore.ticker?.p))"
							:icon="false"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { handleImageError } from '~/utils/helpers';
import IconList from '~/assets/svg-icons/spot/list.svg';
import IconDots from '~/assets/svg-icons/spot/dots.svg';
import IconArrowRight from '~/assets/svg-icons/spot/arrow-right.svg';
import IconStar from '~/assets/svg-icons/market/star.svg';

const router = useRouter();
const spotStore = useSpotStore();
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const openSearchBox = () => {
	router.push('/spot/search-list');
};

const openSlide = ref<boolean>(false);
</script>
