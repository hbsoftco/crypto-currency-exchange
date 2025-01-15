<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 py-3 z-50">
			<UContainer>
				<div class="flex justify-between items-center w-full">
					<div class="flex justify-start items-center gap-3">
						<div>
							<IconArrowRight
								class="text-3xl cursor-pointer text-subtle-text-light dark:text-subtle-text-dark"
								@click="goBack"
							/>
						</div>
						<h2 class="text-sm font-medium mr-2">
							{{ title }}
						</h2>
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

interface PropsDefinition {
	title: string;
}

defineProps<PropsDefinition>();

const goBack = () => {
	window.history.back();
};
</script>
