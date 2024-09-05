<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<LayoutsDefaultMobileHeader class="block md:hidden" />

		<!-- <LayoutsDefaultNotif class="hidden md:block" /> -->
		<PagesSupportButtons class="hidden md:block" />
		<div>
			<slot />
		</div>
		<LayoutsDefaultFooter />
		<LayoutsDefaultMobileFooter class="block md:hidden" />
	</div>
</template>

<script setup lang="ts"></script>
