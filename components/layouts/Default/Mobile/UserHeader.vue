<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 py-3 z-50">
			<UContainer>
				<div class="flex justify-between items-center w-full">
					<div class="flex justify-between items-center w-full">
						<div class="flex justify-start items-center">
							<div>
								<IconArrowRight
									class="text-3xl cursor-pointer text-subtle-text-light dark:text-subtle-text-dark"
									@click="goBack"
								/>
							</div>
							<div class="flex items-center text-sm font-medium mr-2">
								<div
									v-if="!getValueByKey(authStore.getCurrentUser, 'AVATAR_URL')"
									class="flex items-center justify-center bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full w-14 h-14 text-center"
								>
									<IconUserFill class="text-white dark:text-black text-6xl" />
								</div>
								<img
									v-else
									:src="getValueByKey(authStore.getCurrentUser, 'AVATAR_URL')!"
									alt="user-avatar"
									class="w-14 h-14 rounded-full"
								>
								<h5 class="text-lg font-black mr-2">
									{{ getValueByKey(authStore.getCurrentUser, 'NICKNAME') || $t('anonymousUser') }}
								</h5>
							</div>
						</div>
						<div>
							<UiThemeToggle />
						</div>
					</div>

					<div class="flex justify-end items-center gap-3">
						<slot />
					</div>
				</div>
			</UContainer>
		</header>
	</div>
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import { getValueByKey } from '~/utils/helpers';

const authStore = useAuthStore();

// interface PropsDefinition {
// 	title: string;
// }

// defineProps<PropsDefinition>();

const goBack = () => {
	window.history.back();
};
</script>
