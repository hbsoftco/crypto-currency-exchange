<template>
	<div
		v-if="miniRoutineLoading"
		class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md"
	>
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>

		<section>
			<div
				v-for="skeleton in [1, 2]"
				:key="skeleton"
				class="my-6"
			>
				<p class="mt-1 text-sm font-normal text-justify">
					<USkeleton class="h-4 w-24" />
				</p>
			</div>
		</section>

		<section>
			<div class="flex justify-between mt-10 mb-6">
				<div class="flex">
					<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
					<h3 class="text-base font-bold text-black dark:text-white">
						{{ $t('FAQ') }}
					</h3>
				</div>
				<ULink
					class="text-xs font-normal"
					to="/help"
				>
					{{ $t('showMore') }}
				</ULink>
			</div>
			<div>
				<div
					v-for="skeleton in [1, 2]"
					:key="skeleton"
					class="py-2 text-sm font-normal"
				>
					<USkeleton class="h-4 w-24" />
				</div>
			</div>
		</section>

		<section>
			<div class="flex justify-between mt-10 mb-6">
				<div class="flex">
					<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
					<h3 class="text-base font-bold text-black dark:text-white">
						{{ $t('guid') }}
					</h3>
				</div>
				<ULink
					class="text-xs font-normal"
					to="/help"
				>
					{{ $t('showMore') }}
				</ULink>
			</div>
			<div>
				<div
					v-for="skeleton in [1, 2]"
					:key="skeleton"
					class="py-2 text-sm font-normal"
				>
					<USkeleton class="h-4 w-24" />
				</div>
			</div>
		</section>
	</div>
	<div
		v-else
		class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md"
	>
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>
		<div
			v-if="image"
			class="flex justify-center"
		>
			<img
				:src="image"
				:alt="image"
				:class="imageClass"
			>
		</div>

		<section>
			<div
				v-for="tip in tips"
				:key="tip.key"
				class="my-6"
			>
				<p class="mt-1 text-sm font-normal text-justify">
					{{ tip.value }}
				</p>
			</div>
		</section>

		<section v-if="faqs?.length">
			<div class="flex justify-between mt-10 mb-6">
				<div class="flex">
					<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
					<h3 class="text-base font-bold text-black dark:text-white">
						{{ $t('FAQ') }}
					</h3>
				</div>
				<ULink
					class="text-xs font-normal"
					to="/help"
				>
					{{ $t('showMore') }}
				</ULink>
			</div>
			<div>
				<ULink
					v-for="faq in faqs"
					:key="faq.key"
					class="py-2 text-sm font-normal"
				>
					{{ faq.value }}
				</ULink>
			</div>
		</section>

		<section v-if="helps?.length">
			<div class="flex justify-between mt-10 mb-6">
				<div class="flex">
					<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
					<h3 class="text-base font-bold text-black dark:text-white">
						{{ $t('guid') }}
					</h3>
				</div>
				<ULink
					class="text-xs font-normal"
					to="/help"
				>
					{{ $t('showMore') }}
				</ULink>
			</div>
			<div>
				<ULink
					v-for="help in helps"
					:key="help.key"
					class="py-2 text-sm font-normal"
				>
					{{ help.value }}
				</ULink>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { systemRepository } from '~/repositories/system.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { MiniRoutine } from '~/types/definitions/system.types';

interface PropsDefinition {
	imageClass?: string;
	image?: string;
	tagType: string;
}
const props = withDefaults(defineProps<PropsDefinition>(), {
	imageClass: 'w-36 h-36',
});

const { $api } = useNuxtApp();
const systemRepo = systemRepository($api);

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const helps = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(true);
const getSystemMiniRoutine = async () => {
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: props.tagType });

		miniRoutine.value = result as MiniRoutine;
		tips.value = miniRoutine.value.tips;
		faqs.value = miniRoutine.value.faqs;
		helps.value = miniRoutine.value.helps;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

onMounted(async () => {
	await Promise.all([
		getSystemMiniRoutine(),
	]);
});
</script>
