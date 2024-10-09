<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div class="flex flex-col">
						<h1 class="text-4xl font-black">
							{{ $t('helpBuyList') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('helpBuyListTitle') }}</span>
					</div>
					<div>
						<NuxtImg
							src="/images/svg/help-buy-cryoto.svg"
							alt="help-buy"
							class="w-96 h-60"
						/>
					</div>
				</div>
				<div class="w-full md:w-96">
					<SearchCrypto
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						type="text"
						input-class="text-right"
						label="search"
						placeholder=""
						icon="heroicons:magnifying-glass"
					/>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
					<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="Brand Logo"
								class="w-6 h-6 mr-1 rounded-full ml-2"
							/>
							<span class="text-sm font-bold ml-1">BTC</span>
							<span class="text-sm font-normal ml-1">بیت کوین</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</div>
				</div>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="currentPage"
						:page-count="10"
						:total="100"
						:max="4"
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
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

const phoneOrEmail = ref('');

const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
