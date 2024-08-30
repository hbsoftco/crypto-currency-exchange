<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<LayoutsDefaultNotif class="hidden md:block" />
		<PagesSupportButtons />
		<slot />
		<LayoutsDefaultFooter />
	</div>
</template>

<script setup lang="ts"></script>
