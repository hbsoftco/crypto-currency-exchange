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
						<IconStar
							class="text-3xl cursor-pointer"
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
import IconShare from '~/assets/svg-icons/market/share.svg';
// import IconStarFill from '~/assets/svg-icons/market/fill-star.svg';

// const authStore = useAuthStore();

const goBack = () => {
	window.history.back();
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
