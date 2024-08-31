<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<PagesSupportButtons />
		<slot />
		<LayoutsDefaultFooter />
		<LayoutsDefaultMobileFooter class="block md:hidden" />
	</div>
</template>

<script setup lang="ts"></script>
