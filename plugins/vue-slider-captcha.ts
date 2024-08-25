// plugins/vue-slider-captcha.js
import VueSliderCaptcha from 'vue-slider-captcha';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('VueSliderCaptcha', VueSliderCaptcha);
});
