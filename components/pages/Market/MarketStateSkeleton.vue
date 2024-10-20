<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-sm px-2 py-1">
		<div class="flex justify-between px-2 mb-1 py-4">
			<div>
				<span class="text-sm font-bold">
					<USkeleton class="h-4 w-16" />
				</span>
			</div>
			<USkeleton class="h-4 w-10" />
		</div>
		<ul class="px-2">
			<li
				v-for="n in 3"
				:key="n"
				class="flex justify-between items-center my-7"
			>
				<div class="flex justify-start items-center w-28 text-left">
					<USkeleton
						class="h-5 w-5 ml-1"
						:ui="{ rounded: 'rounded-full' }"
					/>
					<div class="text-sm font-normal mr-1">
						<USkeleton class="h-4 w-16" />
					</div>
				</div>
				<div class="w-28 text-left">
					<div class="flex justify-end">
						<USkeleton class="h-4 w-14" />
					</div>
				</div>
				<div class="w-24">
					<div class="flex justify-end">
						<USkeleton class="h-4 w-14" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
</script>
