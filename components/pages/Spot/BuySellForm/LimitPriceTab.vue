<template>
	<div class="h-auto">
		<CoinFieldInput />
		<CoinFieldInput />

		<div dir="ltr">
			<!-- <ClientOnly>
				<vue-slider v-model="value" />
			</ClientOnly> -->
		</div>
	</div>
</template>

<script setup lang="ts">
// import VueSlider from 'vue-slider-component';

import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
import 'vue-slider-component/theme/default.css';

// const value = ref(0);
</script>
