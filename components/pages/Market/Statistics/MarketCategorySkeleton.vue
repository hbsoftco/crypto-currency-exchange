<template>
	<div v-if="!isMobile">
		<div
			class="grid grid-cols-4 gap-5 py-1 my-2 px-2"
		>
			<div
				v-for="n in 4"
				:key="n"
				class=" bg-hover-light dark:bg-hover-dark rounded-md py-1 my-2 px-2"
			>
				<div>
					<div>
						<div class="flex justify-start">
							<USkeleton
								class="h-4 w-32 mx-1 my-1.5"
								:ui="{ rounded: 'rounded' }"
							/>
						</div>
					</div>
					<div
						v-for="t in 6"
						:key="t"
						class="flex justify-between items-center w-full"
					>
						<div class="flex justify-start">
							<div class="flex justify-start">
								<USkeleton
									class="h-4 w-4 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</div>
							<div class="flex justify-start">
								<USkeleton
									class="h-4 w-32 mx-1 my-1.5"
									:ui="{ rounded: 'rounded' }"
								/>
							</div>
						</div>
						<div class="flex justify-end">
							<div class="flex justify-end">
								<USkeleton
									class="h-4 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded' }"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="px-3">
			<div>
				<div class="flex justify-start">
					<USkeleton
						class="h-4 w-32 mx-1 my-1.5"
						:ui="{ rounded: 'rounded' }"
					/>
				</div>
			</div>
			<div
				v-for="t in 6"
				:key="t"
				class="flex justify-between items-center w-full"
			>
				<div class="flex justify-start">
					<div class="flex justify-start">
						<USkeleton
							class="h-4 w-4 mx-1 my-1.5"
							:ui="{ rounded: 'rounded-full' }"
						/>
					</div>
					<div class="flex justify-start">
						<USkeleton
							class="h-4 w-32 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
				</div>
				<div class="flex justify-end">
					<div class="flex justify-end">
						<USkeleton
							class="h-4 w-10 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
