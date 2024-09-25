<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<LayoutsDefaultMobileHeader class="block md:hidden" />
		<div class="pb-10">
			<slot />
		</div>
		<LayoutsTradeFooter />
		<UiToast />
	</div>
</template>

<script setup lang="ts"></script>
