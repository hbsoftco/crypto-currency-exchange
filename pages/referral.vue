<template>
	<div class="mt-20 md:mt-0">
		<section class="relative">
			<PagesImageCover>
				<UContainer class=" h-full">
					<div class="w-full h-full relative flex justify-between">
						<div class="absolute top-0 md:top-40 lg:top-56">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("inviteFriends") }}
							</h1>
							<div
								class="p-1 md:p-3 rounded bg-primary-gray-light dark:bg-primary-gray-dark shadow-md text-white w-full md:w-[30rem] h-auto opacity-75"
							>
								<b class="text-text-dark dark:text-text-light text-sm md:text-base">								{{ $t("inviteFriends") }}
									{{ $t("titleReferral") }}
								</b><br>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									{{ $t("subTitleReferral") }}
								</p>
							</div>
						</div>
						<NuxtImg
							src="/images/svg/invite.svg"
							alt="invite-friends"
							class="absolute bottom-0 left-0 hidden md:block w-[32.5rem] h-[32.5rem]"
						/>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>

		<section>
			<UContainer>
				<div
					class="relative max-w-full w-full md:max-w-[46.125rem] md:w-[46.125rem] m-auto top-0 md:-top-32 lg:-top-24 bg-hover-light dark:bg-hover-dark py-10 px-8 md:mx-30 rounded-lg shadow-lg"
				>
					<p
						class="text-primary-yellow-light dark:text-primary-yellow-dark text-2xl font-extrabold pb-4"
					>
						{{ $t("howStart") }}
					</p>
					<ul class="list-disc text-base custom-list px-4 pb-4">
						<li class="pb-3">
							<b>{{ $t("registerBitland") }}!</b><br>
							<p>
								{{ $t("textRegisterBitland") }}
							</p>
						</li>
						<li class="pb-3">
							<b>{{ $t("inviteFriends") }}</b><br>
							<p>
								{{ $t("textInviteFriends") }}
							</p>
						</li>
						<li class="pb-3">
							<b>{{ $t("receiveCommission") }}</b><br>
							<p>
								{{ $t("textReceiveCommission") }}
							</p>
						</li>
					</ul>
					<UiSeeMore
						link="/"
						text="getStarted"
					/>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="mt-16 md:mt-0 md:flex md:justify-between mb-20">
					<div>
						<NuxtImg
							src="/images/svg/platform.svg"
							alt="platform"
							class="w-[66rem]"
						/>
					</div>
					<div class="px-4 md:px-28 mt-8 md:mt-10">
						<p class="text-2xl md:text-4xl font-extrabold pb-8">
							{{ $t("bitlandPlatformMonetizationTable") }}
						</p>
						<ul class="list-disc text-base font-medium">
							<li>
								{{ $t("bitlandPlatformMonetizationTableItem1") }}
							</li>
							<br>
							<li>
								{{ $t("bitlandPlatformMonetizationTableItem2") }}
							</li>
							<br>
							<li>
								{{ $t("bitlandPlatformMonetizationTableItem3") }}
							</li>
							<br>
							<li>
								{{ $t("bitlandPlatformMonetizationTableItem4") }}
							</li>
						</ul>
					</div>
				</div>
			</UContainer>
		</section>

		<CommonDownloadApp />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-list li::marker {
  color: #007bff;
  font-size: 2rem;
}
</style>
