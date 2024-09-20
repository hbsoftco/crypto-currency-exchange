<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<LayoutsDefaultMobileHeader class="block md:hidden" />
		<div>
			<slot />
		</div>
		<LayoutsTradeFooter />
		<UiToast />
	</div>
</template>

<script setup lang="ts"></script>
