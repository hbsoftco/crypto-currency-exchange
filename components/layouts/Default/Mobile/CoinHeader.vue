<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 py-3 z-10">
			<UContainer>
				<div class="flex justify-between items-center w-full">
					<div class="flex justify-start items-center gap-3">
						<div>
							<IconArrowRight
								class="text-3xl cursor-pointer text-subtle-text-light dark:text-subtle-text-dark"
								@click="goBack"
							/>
						</div>
						<h2 class="pb-1.5 border-b text-sm font-medium border-primary-yellow-light dark:border-primary-yellow-dark text-primary-yellow-light dark:text-primary-yellow-dark">
							{{ $t('currencyInformation') }}
						</h2>
						<h2 class="pb-1.5 border-b border-transparent text-sm font-medium mr-2">
							{{ $t('chart') }}
						</h2>
					</div>

					<div class="flex justify-end items-center gap-3">
						<IconStarFill
							v-if="status"
							class="text-3xl cursor-pointer"
							@click="addFavorite(id, status)"
						/>
						<IconStar
							v-else
							class="text-3xl cursor-pointer"
							@click="addFavorite(id, status)"
						/>
						<IconShare
							class="text-3xl cursor-pointer"
							@click="shareContent"
						/>
					</div>
				</div>
			</UContainer>
		</header>
	</div>
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconStarFill from '~/assets/svg-icons/market/fill-star.svg';
import IconShare from '~/assets/svg-icons/market/share.svg';
import { marketRepository } from '~/repositories/market.repository';

interface PropsDefinition {
	id: number;
}

defineProps<PropsDefinition>();

const status = ref<boolean>(false);

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const authStore = useAuthStore();
const router = useRouter();

const goBack = () => {
	window.history.back();
};

const addFavorite = async (id: number, status: boolean | undefined) => {
	if (authStore.isLoggedIn) {
		if (status === true) {
			await marketRepo.dislikeMarket({ id });
		}
		else {
			await marketRepo.likeMarket({ id });
		}
	}
	else {
		router.push('/auth/login');
	}
};

const shareContent = async () => {
	if (navigator.share) {
		await navigator.share({
			title: window.location.href,
			text: '',
			url: window.location.href,
		})
			.then(() => {
				console.log('Shared!');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	else {
		console.log('navigator does not support on this browser.');
	}
};

onMounted(() => {
	// authStore.loadAuthData();
});
</script>
