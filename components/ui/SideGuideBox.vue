<template>
	<div class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
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
				class="w-36 h-36"
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
					to="/help-center"
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
					to="/help-center"
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
import type { KeyValue } from '~/types/definitions/common.types';

interface PropsDefinition {
	faqs: KeyValue[];
	tips: KeyValue[];
	helps: KeyValue[];
	image?: string;
}

defineProps<PropsDefinition>();
</script>
