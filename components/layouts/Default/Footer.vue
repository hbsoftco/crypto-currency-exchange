<template>
	<footer class="w-full h-auto bg-primary-gray-light dark:bg-primary-gray-dark shadow-md z-20">
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6">
				<div class="col-span-12 md:col-span-5 px-0 md:px-4">
					<NuxtImg
						src="/images/svg/brand-logo.svg"
						alt="Brand Logo"
						class="mb-3 w-28 h-12"
					/>
					<span class="font-bold leading-loose text-base">
						{{ $t('bitlandProductByCompany') }}
					</span>
					<p class="leading-loose text-sm font-normal">
						{{ $t('bitlandExchangeDescription') }}
					</p>
					<div>
						<span class="leading-loose text-sm font-normal">{{ $t('phoneNumber2') }} :</span>
						<span class="leading-loose text-sm font-normal">{{ useNumber('02128223131') }}</span>
					</div>
					<div>
						<span class="leading-loose text-sm font-normal">{{ $t('emailAddress') }} :</span>
						<span class="leading-loose text-sm font-normal">
							admin@bitland.ir
						</span>
					</div>
				</div>

				<div class="col-span-12 md:col-span-7 mt-0 md:mt-4">
					<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<div
							v-for="section in sectionList"
							:key="section.id"
						>
							<span
								class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-bold"
							>
								{{ section.info[0]?.title }}
							</span>

							<div class="mt-2">
								<div v-if="section.info[0]?.title !== followUs">
									<div
										v-for="(link, index) in section.links"
										:key="index"
										class="text-sm font-medium pb-2"
									>
										<ULink
											:to="link.url"
											target="_blank"
										>
											{{ link.info[0]?.title }}
										</ULink>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h5
								class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-bold mb-4"
							>
								{{ $t('followUs') }}
							</h5>
							<div
								class="grid grid-cols-4 gap-2"
							>
								<ULink
									v-for="(subItem, subIndex) in footerItems[0].subItems"
									:key="subIndex"
									:to="subItem.url"
									target="_blank"
									class="w-8 h-8"
								>
									<component :is="subItem.name" />
								</ULink>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="border-t-secondary-gray-light dark:border-t-secondary-gray-dark border-t text-center mt-10">
				<p class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal p-2">
					{{ $t('copyrightNotice') }}
				</p>
			</div>
		</UContainer>
	</footer>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import { decorationRepository } from '~/repositories/decoration.repository';
import type { GetRootListParams } from '~/types/base.types';
import type { Section } from '~/types/response/decoration.types';
import { Language } from '~/utils/enums/language.enum';
// import IconGoogle from '~/assets/svg-icons/social/google.svg';
// import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
// import IconMessenger from '~/assets/svg-icons/social/messenger.svg';
// import IconMicrosoftTeam from '~/assets/svg-icons/social/microsoft-team.svg';
// import IconTwitch from '~/assets/svg-icons/social/twitch.svg';
// import IconViber from '~/assets/svg-icons/social/viber.svg';
// import IconWechat from '~/assets/svg-icons/social/wechat.svg';
// import IconYoutube from '~/assets/svg-icons/social/youtube.svg';

const followUs = 'followUs';

const footerItems = [
	{
		title: followUs,
		subItems: [
			{ name: IconInstagram, url: 'https://instagram.com/bitland.io' },
			{ name: IconTelegram, url: 'https://t.me/bitlandio' },
			{ name: IconTwitter, url: 'https://x.com/bitlandio' },
			{ name: IconWhatsapp, url: 'https://wa.me/+989026031145' },
			// { name: IconGoogle, url: '#' },
			// { name: IconLinkedin, url: '#' },
			// { name: IconMessenger, url: '#' },
			// { name: IconMicrosoftTeam, url: '#' },
			// { name: IconTwitch, url: '#' },
			// { name: IconViber, url: '#' },
			// { name: IconWechat, url: '#' },
			// { name: IconYoutube, url: '#' },
		],
	},
];
const { $api } = useNuxtApp();
const decorationRepo = decorationRepository($api);

const RootListParams = ref<GetRootListParams>({
	languageId: String(Language.PERSIAN),
	group: 'Footer',
});
const linkListLoading = ref<boolean>(false);
const sectionList = ref<Section[]>();
const getLinkList = async () => {
	try {
		linkListLoading.value = true;
		const { result } = await decorationRepo.getLinkList(RootListParams.value);
		sectionList.value = result.sections;

		for (const section of sectionList.value) {
			section.links = result.links.filter((link) => link.sectionId === section.id);
		}
		linkListLoading.value = false;
	}
	catch (error) {
		linkListLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getLinkList(),
	]);
});
</script>
