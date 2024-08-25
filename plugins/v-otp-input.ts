import VOtpInput from 'vue3-otp-input';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('v-otp-input', VOtpInput);
});
