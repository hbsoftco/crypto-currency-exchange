<template>
	<div>
		<h3 class="text-base font-medium">
			{{ $t('UsingAPIKey') }}
		</h3>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="nameApiKey"
				placeholder=""
				icon=""
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="activeUntil"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="ApiPassword"
				placeholder="***********"
				icon="heroicons:eye"
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<URadioGroup
				v-model="selected"
				:options="options"
			>
				<template #label="{ option }">
					<p>
						<UIcon
							:name="option.icon"
							class="text-primary-yellow-light dark:text-primary-yellow-dark text-base"
						/>
						{{ option.label }}
					</p>
				</template>
			</URadioGroup>
			<ul class="list-disc my-1">
				<li class="text-base font-medium">
					{{ $t('selectingWithdrawalApi') }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import FormsFieldInput from '~/components/forms/FieldInput.vue';
import DropDown from '~/components/forms/DropDown.vue';
// import IconCopy from '~/assets/svg-icons/menu/copy.svg';
// import { useNumber } from '~/composables/useNumber';
const phoneOrEmail = ref<string>('');

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');

const options = [{
	value: 'accessOpenApi',
	label: 'accessOpenApi',
	icon: '',
}, {
	value: 'IpRestrictions',
	label: 'IpRestrictions',
	icon: 'heroicons:information-circle',
}];

const selected = ref('sms');
</script>
