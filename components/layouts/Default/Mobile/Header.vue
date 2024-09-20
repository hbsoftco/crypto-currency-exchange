<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 py-3 z-10">
			<UContainer>
				<div class="flex justify-between items-center w-full">
					<div>
						<LayoutsDefaultMobileHeaderUserLogin />
					</div>
					<div class="flex-1 mx-2">
						<LayoutsDefaultHeaderSearch />
					</div>
					<div>
						<LayoutsDefaultMobileHeaderSupport />
					</div>
					<div class="mr-2">
						<LayoutsDefaultHeaderUserLoginNotification />
					</div>
				</div>
			</UContainer>
		</header>
		<!-- <Notif class="mt-14" /> -->
	</div>
</template>

<script setup lang="ts">
// import Notif from '../Notif.vue';
</script>

<style scoped>

</style>
