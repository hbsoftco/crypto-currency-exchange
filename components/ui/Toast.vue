<template>
	<UNotifications
		class="text-right"
		dir="rtl"
	>
		<template #title="{ title }">
			<span>{{ title }}</span>
		</template>

		<template #description="{ description }">
			<div>
				<span>{{ description }}</span>
			</div>
		</template>
	</UNotifications>
</template>

<script setup lang="ts">
</script>
