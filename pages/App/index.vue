<template>
	<div>
		<UContainer>
			<div class="flex justify-between items-center mt-20 mb-32">
				<div>
					<ULink to="/">
						<NuxtImg
							src="/images/svg/brand-logo.svg"
							alt="Brand Logo"
							class="w-28 h-12"
						/>
					</ULink>
					<h1 class="mt-11 mb-6 text-2xl font-bold">
						{{ $t('titleDownloadApp') }}
					</h1>
					<p class="text-xl font-bold">
						{{ $t('textDownloadApp') }}
					</p>
					<div class="block md:flex items-center mt-11 mb-16">
						<span class="text-xl font-bold">{{ $t('suggestDownloadApp') }}</span>
						<NuxtImg
							src="/images/QR.png"
							alt="QR"
							class="w-52 h-52 mr-20 mt-4 md:mt-0"
						/>
					</div>
					<p class="text-xl font-bold mb-6">
						{{ $t('titrDownloadApp') }}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3  gap-3">
						<ULink to="">
							<NuxtImg
								src="/images/svg/windows.svg"
								alt="windows"
								class="w-52 h-16"
							/>
						</ULink>
						<ULink to="">
							<NuxtImg
								src="/images/svg/app-store.svg"
								alt="app-store"
								class="w-52 h-16"
							/>
						</ULink>
						<ULink to="">
							<NuxtImg
								src="/images/svg/google-play.svg"
								alt="google-play"
								class="w-52 h-16"
							/>
						</ULink>
					</div>
				</div>
				<div class="hidden md:block">
					<NuxtImg
						src="/images/svg/icon-download-app.svg"
						alt="platform"
						class="w-[38.596rem] h-[25.875rem]"
					/>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
