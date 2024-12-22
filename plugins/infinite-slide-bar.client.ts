import InfiniteSlideBar from 'vue3-infinite-slide-bar';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('InfiniteSlideBar', InfiniteSlideBar);
});
