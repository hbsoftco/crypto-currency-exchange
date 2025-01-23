<template>
	<div
		v-if="!isMobile"
		class="flex flex-col"
	>
		<div
			v-for="(step, index) in steps"
			:key="index"
			class="flex"
		>
			<div class="flex flex-col items-center">
				<!-- Circle -->
				<div
					:class="[
						'w-4 h-4 flex items-center justify-center rounded-full',
						step.completed ? 'bg-yellow-500' : step.current ? 'bg-yellow-500' : 'bg-gray-500',
					]"
				/>
				<!-- Vertical Line -->
				<div
					v-if="index < steps.length - 1"
					:class="[
						'h-14 w-0.5',
						step.completed || (index < steps.findIndex(s => s.current)) ? 'bg-yellow-500' : 'bg-gray-300',
					]"
				/>
			</div>
			<!-- Step Label -->
			<div class="mr-2 relative -top-1">
				<span
					:class="[
						'text-sm font-medium',
						step.completed ? 'text-yellow-500' : step.current ? '' : 'text-gray-500',
					]"
				>
					{{ step.label }}
				</span>
			</div>
		</div>
	</div>

	<div
		v-else
		class="flex flex-row items-center justify-between w-full relative pb-6"
	>
		<div
			v-for="(step, index) in steps"
			:key="index"
			class="flex items-center w-full"
			:style="{ flex: 1, flexGrow: index === steps.length - 1 ? 0 : 1 }"
		>
			<!-- Circle -->
			<div
				:class="[
					'w-4 h-4 flex items-center justify-center rounded-full',
					step.completed ? 'bg-yellow-500' : step.current ? 'bg-yellow-500' : 'bg-gray-500',
				]"
			/>
			<!-- Horizontal Line -->
			<div
				v-if="index < steps.length - 1"
				:class="[
					'h-0.5',
					step.completed || (index < steps.findIndex(s => s.current)) ? 'bg-yellow-500' : 'bg-gray-300',
				]"
				:style="{ flex: 1, height: '2px' }"
			/>
		</div>
		<!-- Step Labels -->
		<div class="absolute top-4 w-full mt-2 flex justify-between">
			<div
				v-for="(step, index) in steps"
				:key="index"
				class="text-center"
				:style="{ flex: 1 }"
			>
				<span
					:class="[
						'text-xs font-medium',
						step.completed ? 'text-yellow-500' : step.current ? '' : 'text-gray-500',
					]"
				>
					{{ step.label }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Step {
	label: string;
	completed: boolean;
	current: boolean;
}

interface Props {
	steps: Step[];
}
defineProps<Props>();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
