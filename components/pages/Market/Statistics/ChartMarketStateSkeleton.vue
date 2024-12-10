<template>
	<div>
		<div
			class="py-1 my-2 px-2"
		>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<div class="flex justify-start">
						<USkeleton
							class="h-6 w-full mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div class="flex justify-start">
						<USkeleton
							class="h-6 w-36 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div class="flex justify-start">
						<USkeleton
							class="h-6 w-56 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-start"
					>
						<USkeleton
							class="h-6 w-60 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-start"
					>
						<USkeleton
							class="h-6 w-48 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-start"
					>
						<USkeleton
							class="h-6 w-full mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
				</div>
				<div>
					<div class="flex justify-center items-center">
						<USkeleton
							class="h-20 w-20 md:h-40 md:w-40 mx-1 my-1.5"
							:ui="{ rounded: 'rounded-full' }"
						/>
					</div>
				</div>
				<div>
					<div class="flex justify-end">
						<USkeleton
							class="h-6 w-full mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div class="flex justify-end">
						<USkeleton
							class="h-6 w-36 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div class="flex justify-end">
						<USkeleton
							class="h-6 w-56 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-end"
					>
						<USkeleton
							class="h-6 w-60 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-end"
					>
						<USkeleton
							class="h-6 w-48 mx-1 my-1.5"
							:ui="{ rounded: 'rounded' }"
						/>
					</div>
					<div
						v-if="!isMobile"
						class="flex justify-end"
					>
						<USkeleton
							class="h-6 w-full mx-1 my-1.5"
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
