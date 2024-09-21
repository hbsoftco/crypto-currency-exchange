<template>
	<div class="flex flex-col items-center mt-5 w-full">
		<!-- مقدار انتخاب‌شده (درصد) -->
		<div class="text-gray-300">
			{{ value }}%
		</div>

		<!-- اسلایدر -->
		<div class="relative w-full mt-3">
			<!-- خط اصلی اسلایدر -->
			<div class="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-600 rounded-full" />

			<!-- نقاط اسلایدر -->
			<div
				v-for="step in steps"
				:key="step"
				class="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 bg-gray-400 rounded-full"
				:style="{ left: `${step}%` }"
			/>

			<!-- ورودی (input) اسلایدر -->
			<input
				v-model="value"
				type="range"
				min="0"
				max="100"
				step="25"
				class="absolute w-full h-2 opacity-0 cursor-pointer"
			>

			<!-- نشانگر (thumb) -->
			<div
				class="absolute top-1/2 transform -translate-y-1/2 h-5 w-5 bg-yellow-400 rounded-full border border-gray-400"
				:style="{ left: `${value}%`, transform: 'translate(-50%, -50%)' }"
			/>
		</div>

		<!-- مقیاس (0% تا 100%) -->
		<div class="w-full flex justify-between text-gray-300 mt-2">
			<span>0%</span>
			<span>100%</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// مقدار اسلایدر
const value = ref(0);

// نقاط مختلف اسلایدر (25٪, 50٪, 75٪, 100٪)
const steps = [0, 25, 50, 75, 100];
</script>

  <style scoped>
  /* پنهان کردن thumb پیش‌فرض اسلایدر */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
  }
  </style>
