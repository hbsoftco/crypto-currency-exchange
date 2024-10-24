<template>
	<div class="min-h-screen flex">
		<div class="bg-yellow-400 w-full md:w-1/2 items-center justify-center hidden md:flex">
			<div class="w-full h-full flex items-center justify-center">
				<img
					src="/images/bg/market.webp"
					alt="Market Icon"
					class="object-cover w-full h-full"
				>
			</div>
		</div>
		<div class="bg-primaryGray-light dark:bg-primaryGray-dark text-white w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
			<div class="w-full md:w-[22.5rem] absolute left-0 right-0 top-0 m-auto mt-10">
				<div class="flex justify-between items-center px-8">
					<div>
						<ULink to="/">
							<img
								src="/images/svg/brand-logo.svg"
								alt="Brand Logo Icon"
								class="w-[77.6px] h-[32px]"
							>
						</ULink>
					</div>
					<div>
						<UiThemeToggle />
					</div>
				</div>
			</div>
			<div class="w-full md:w-[22.5rem]">
				<slot />
			</div>
		</div>
		<UiToast />
		<UModals />
	</div>
</template>

<script setup lang="ts">
</script>
