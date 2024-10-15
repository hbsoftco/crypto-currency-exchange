<template>
	<div>
		<ModalInviteFriends
			v-if="showModalInviteFriends"
			@close="closeModalInviteFriends"
		/>
		<EditCodeInviteFriends
			v-if="showEditCodeInviteFriends"
			@close="closeEditCodeInviteFriends"
		/>
		<UContainer>
			<section>
				<div class="my-6 block md:hidden">
					<UiTitleWithBack
						:title="$t('inviteFriends')"
						:back-btn="true"
					/>
				</div>
				<div class="my-2 flex flex-col-reverse md:flex md:flex-row justify-between items-center">
					<div>
						<h1 class="text-2xl md:text-4xl font-extrabold leading-loose">
							<span class="text-primary-yellow-light dark:text-primary-yellow-dark">بیت لند</span> ، تنها صرافی در ایران با کسب درآمد تا پنج سطح
						</h1>
						<h3 class="text-base font-bold mt-8">
							تا ۵۰% کمیسیون در هر معامله از زیر مجموعه های خود دریافت کنید.
						</h3>
					</div>
					<NuxtImg
						src="images/svg/platform.svg"
						alt="platform"
						class="w-[36.174rem] md:h-[30.099rem]"
					/>
				</div>
			</section>

			<section>
				<div class=" my-16 border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
					<div class="block md:flex items-center justify-between px-1 md:px-14 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark ">
						<div>
							<div class="flex pb-2 md:pb-0">
								<div class="w-1 h-4 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
								<h4 class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('invitationCode') }}
								</h4>
							</div>
							<div
								class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
								dir="ltr"
							>
								<p class="truncate text-ellipsis overflow-hidden pr-6">
									1cUFo
								</p>
								<div class="flex justify-between">
									<IconEdit
										class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
										@click.prevent="openEditCodeInviteFriends"
									/>
									<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
								</div>
							</div>
						</div>
						<div>
							<div class="flex py-2 md:pb-0">
								<div class="w-1 h-4 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
								<h4 class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('invitationLink') }}
								</h4>
							</div>
							<div
								class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
								dir="ltr"
							>
								<p class="truncate text-ellipsis overflow-hidden pr-1 md:pr-6">
									https://www.bitland.com/register?inviteCode=1cUFo
								</p>
								<div>
									<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
								</div>
							</div>
						</div>
						<div class="flex justify-between py-2 md:pb-0">
							<UButton
								class="text-base font-medium px-12 py-1 h-12 mx-3 text-center"
								to=""
								@click.prevent="openModalInviteFriends"
							>
								{{ $t("inviteFriends") }}
							</UButton>
							<div class="w-12 h-12 bg-primary-gray-light dark:bg-primary-gray-dark flex justify-center items-center cursor-pointer rounded-md">
								<IconQrCode class="text-3xl" />
							</div>
						</div>
					</div>
					<div class="px-1 md:p-4 pt-4">
						<div class="flex justify-between">
							<h5>{{ $t('howDoesWork') }}</h5>
							<ULink class="flex items-center">
								<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('bonusRules') }}</span>
								<IconArrowLeft class="text-base mr-2 text-primary-yellow-light dark:text-primary-yellow-dark" />
							</ULink>
						</div>
						<div class="py-4 flex justify-center items-center">
							<IconSend class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
							<div class="w-28 md:w-56 h-[0.125rem] mx-4 md:mx-16 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
							<IconUser class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
							<div class="w-28 md:w-56 h-[0.125rem] mx-4 md:mx-16 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
							<IconGift class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
						</div>
						<div
							v-if="showDescription"
							class="flex py-4"
						>
							<p class="text-sm font-medium text-center">
								{{ $t('howDoesWorkOne') }}
							</p>
							<p class="px-1 md:px-28 text-sm font-medium text-center">
								{{ $t('howDoesWorkTwo') }}
							</p>
							<p class="text-sm font-medium text-center">
								{{ $t('howDoesWorkThree') }}
							</p>
						</div>
						<div class="flex justify-center py-2">
							<ULink
								to=""
								class="flex group-hover:hidden"
								@click.prevent="toggleDescription"
							>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ showDescription ? $t('hiddenDescription') : $t('showDescription') }}
								</span>
								<IconArrowUp
									v-if="showDescription"
									class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
								/>
								<IconArrowDown
									v-else
									class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
								/>
							</ULink>
						</div>
					</div>
				</div>
			</section>

			<section class="my-6">
				<div class="flex flex-col-reverse md:flex md:flex-row justify-between items-center">
					<div>
						<h6 class="text-base font-bold">
							{{ $t('upgrade') }}
						</h6>
					</div>
					<div>
						<NuxtImg
							src="/images/profile/upgrade.png"
							alt="upgrade"
							class=""
						/>
					</div>
				</div>
				<div class="flex my-6">
					<div class="flex ml-1 md:ml-10 items-center">
						<div class="w-1 h-4 ml-1 md:ml-2 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
						<span class="text-xs md:text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('directCommissionPercentage') }}: </span>
						<span class="text-xs md:text-base font-bold mr-0 md:mr-1">{{ useNumber('۳۰') }}%</span>
					</div>
					<div>
						<span class="text-xs md:text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('percentageTreeCommission') }}: </span>
						<span class="text-xs md:text-base font-bold mr-0 md:mr-1">{{ useNumber('۵۰') }}%</span>
					</div>
				</div>
				<div class="flex justify-between">
					<div>
						<span class="text-base font-bold">سطح ۱</span>

						<div class="text-xs font-normal">
							<span class="ml-1">{{ $t('commissionLevel') }}:</span><span>{{ useNumber('30') }}%</span>
						</div>
					</div>
					<div>
						<span class="text-base font-bold">سطح 0</span>

						<div class="text-xs font-normal">
							<span class="ml-1">{{ $t('commissionLevel') }}:</span><span>{{ useNumber('30') }}%</span>
						</div>
					</div>
				</div>
				<div class="my-4">
					<UiProgressBar />
				</div>
				<div class="flex justify-between pb-4 px-4">
					<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						<span class="ml-1">{{ $t('user') }}</span><span>{{ useNumber('50') }}</span>
					</div>
					<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						<span class="ml-1">{{ $t('user') }}</span><span>{{ useNumber('50') }}</span>
					</div>
				</div>
				<div class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal">
					<p>شما <span>{{ useNumber('4') }}</span> نفر تاکنون به بیت لند دعوت کرده اید، تعداد <span>{{ useNumber('8') }}</span> نفر دیگر دعوت کنید تا به سطح <span>{{ useNumber('1') }}</span> ارتقا یابید.</p>
				</div>
			</section>

			<section>
				<div class="flex justify-center items-center">
					<div class="py-6 px-1 md:px-12 ml-1 md:ml-28">
						<div class="flex flex-col border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
							<span class="text-xl font-bold mb-6 text-subtle-text-light dark:text-subtle-text-dark">{{ $t('allInvitees') }}</span>
							<span class="text-4xl font-extrabold text-primary-yellow-light dark:text-primary-yellow-dark">{{ useNumber('8,000+') }}</span>
						</div>
						<div>
							<span class="flex flex-col text-xl font-bold mb-6 text-subtle-text-light dark:text-subtle-text-dark pt-4">{{ $t('totalCommissionPaid') }}</span>
							<span class="text-4xl font-extrabold text-primary-yellow-light dark:text-primary-yellow-dark">{{ useNumber('۶.۲۰۰') }} {{ $t('toman') }}</span>
						</div>
					</div>
					<div>
						<NuxtImg
							src="/images/profile/gift-invite.png"
							alt="gift-invite"
							class="w-44 md:w-[27.607rem] h-36 md:h-[22.5rem]"
						/>
					</div>
				</div>
			</section>

			<section>
				<div class="block md:flex items-center justify-between my-12 py-4 px-0 md:px-8 border-none md:border border-primary-gray-light dark:border-primary-gray-dark">
					<div class="flex">
						<span class="text-2xl font-bold ml-4">{{ $t('dashboard') }}</span>
						<div>
							<USelect
								icon="heroicons:calendar-date-range-16-solid"
								:ui="{
									color: {
										white: {
											outline: 'shadow-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
										},
									},
								}"
								class="w-44"
								:options="['همه', 'Canada', 'Mexico']"
							/>
						</div>
					</div>
					<div class="block md:flex">
						<div class="w-72 ml-8 my-8 md:my-0 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
							<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
								<NuxtImg
									src="/images/profile/money.png"
									alt="money"
									class="w-6 h-6 ml-1"
								/>
								<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalIncome') }}</span>
							</div>
							<div class="flex justify-between pt-4 py-8">
								<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('toman') }}</span><span class="text-sm font-medium">{{ useNumber('۵۶۷،۴۷۴') }}</span>
							</div>
						</div>
						<div class="w-72 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
							<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
								<IconUserInvite class="ml-1 text-2xl text-primary-yellow-light dark:text-primary-yellow-dark " />
								<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalIncome') }}</span>
							</div>
							<div class="flex w-60 pt-4 py-8">
								<div class="w-36 pl-2 border-l-4 border-primary-gray-light dark:border-primary-gray-dark">
									<div class="flex justify-between">
										<span class="text-sm font-medium">{{ $t('direct') }}</span><span class="text-sm font-bold">{{ useNumber('۳۰') }}</span>
									</div>
									<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
										<span class="text-sm font-medium">{{ $t('active') }}</span><span class="text-sm font-bold">{{ useNumber('۲۰') }}</span>
									</div>
									<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
										<span class="text-sm font-medium">{{ $t('inactive') }}</span><span class="text-sm font-bold">{{ useNumber('۱۰') }}</span>
									</div>
								</div>
								<div class="w-36 pr-2">
									<div class="flex justify-between">
										<span class="text-sm font-medium">{{ $t('direct') }}</span><span class="text-sm font-bold">{{ useNumber('۳۰') }}</span>
									</div>
									<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
										<span class="text-sm font-medium">{{ $t('active') }}</span><span class="text-sm font-bold">{{ useNumber('۲۰') }}</span>
									</div>
									<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
										<span class="text-sm font-medium">{{ $t('inactive') }}</span><span class="text-sm font-bold">{{ useNumber('۱۰') }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="mb-12">
				<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
					<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark ">
						<div class="flex">
							<span class="text-base font-bold ml-2 mb-2 md:mb-0">
								{{ $t('invitationHistory') }}
							</span>
							<IconQuestion class="text-2xl" />
						</div>
						<div class="w-full md:w-auto flex justify-between">
							<div>
								<USelect
									icon="heroicons:calendar-date-range-16-solid"
									:ui="{
										color: {
											white: {
												outline: 'shadow-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
											},
										},
									}"
									class="w-auto md:w-44"
									:options="['همه', 'Canada', 'Mexico']"
								/>
							</div>
							<div class="mx-1 md:mx-3">
								<USelect
									icon="heroicons:calendar-date-range-16-solid"
									:ui="{
										color: {
											white: {
												outline: 'shadow-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
											},
										},
									}"
									class="w-auto md:w-44"
									:options="['همه', 'Canada', 'Mexico']"
								/>
							</div>
							<div class="py-2 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
								<IconNote />
							</div>
						</div>
					</div>
					<div class="py-6 px-1 md:px-8">
						<div class="hidden md:block">
							<table class="min-w-full py-6 my-2 text-right">
								<thead>
									<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
										<th class="py-2 text-sm font-bold">
											{{ $t('subSet') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('userCode') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('invitationTime') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('feeReceived') }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="row in inviteList"
										:key="row.uid"
										class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
									>
										<td class="text-sm font-normal py-2">
											{{ row.user }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(row.uid) }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(formatDateToIranTime(row.regTime)) }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(row.income) }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div
							v-for="row in inviteList"
							:key="row.uid"
						>
							<div class="block md:hidden my-2 py-2 px-4 bg-hover-light dark:bg-hover-dark">
								<div class="flex">
									<div class="bg-subtle-text-light dark:bg-subtle-text-dark rounded-full w-8 h-8 flex items-center justify-center ml-4">
										<IconUserInvite
											class="text-[1.7rem] text-white dark:text-black"
										/>
									</div>
									<div>
										<div class="text-sm font-normal border-b border-primary-gray-light dark:border-primary-gray-dark">
											{{ row.user }}
										</div>
										<div class="text-sm font-normal">
											{{ useNumber(row.uid) }}
										</div>
									</div>
								</div>
								<div class="flex justify-between py-1">
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ $t('invitationTime') }}
									</div>
									<div class="text-sm font-medium">
										{{ useNumber(formatDateToIranTime(row.regTime)) }}
									</div>
								</div>
								<div class="flex justify-between">
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ $t('feeReceived') }}
									</div>
									<div class="text-sm font-medium">
										{{ useNumber(row.income) }}
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center py-4">
							<UPagination
								:model-value="20"
								:page-count="20"
								:total="20"
								:max="6"
								size="xl"
								ul-class="flex space-x-2 bg-blue-500 border-none"
								li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
								button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
								button-class-inactive="bg-green-700 hover:bg-gray-600"
								button-class-active="bg-blue-500"
								class="my-14"
								@update:model-value="onPageChangeInvite"
							/>
						</div>
					</div>
				</div>
			</section>

			<section class="mb-12">
				<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
					<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark ">
						<div class="flex">
							<span class="text-base font-bold ml-2 mb-2 md:mb-0">
								{{ $t('historyInvitationCommission') }}
							</span>
							<IconQuestion class="text-2xl" />
						</div>
						<div class="flex justify-between">
							<div class="mx-3">
								<USelect
									icon="heroicons:calendar-date-range-16-solid"
									:ui="{
										color: {
											white: {
												outline: 'shadow-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
											},
										},
									}"
									class="w-44"
									:options="['همه', 'Canada', 'Mexico']"
								/>
							</div>
							<div class="py-2 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
								<IconNote />
							</div>
						</div>
					</div>
					<div class="py-6 px-1 md:px-8">
						<div class="hidden md:block">
							<table class=" min-w-full py-6 my-2 text-right">
								<thead>
									<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
										<th class="py-2 text-sm font-bold">
											{{ $t('subSet') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('userCode') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('tradingTime') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('feePercentage') }}
										</th>
										<th class="py-2 text-sm font-bold">
											{{ $t('feeAmount') }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in ReceivedList"
										:key="item.id"
										class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
									>
										<td class="text-sm font-normal py-2">
											{{ item.tUser }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ item.tuid }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(formatDateToIranTime(item.tTime)) }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(item.perc) }}
										</td>
										<td class="text-sm font-normal py-2">
											{{ useNumber(item.tFee) }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div
							v-for="item in ReceivedList"
							:key="item.id"
						>
							<div class="block md:hidden my-2 py-2 px-4 bg-hover-light dark:bg-hover-dark">
								<div class="flex">
									<div class="bg-subtle-text-light dark:bg-subtle-text-dark rounded-full w-8 h-8 flex items-center justify-center ml-4">
										<IconUserInvite
											class="text-[1.7rem] text-white dark:text-black"
										/>
									</div>
									<div>
										<div class="text-sm font-normal border-b border-primary-gray-light dark:border-primary-gray-dark">
											{{ $t('userCode') }}
										</div>
										<div class="text-sm font-normal">
											{{ item.tuid }}
										</div>
									</div>
								</div>
								<div class="flex justify-between py-1">
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ $t('tradingTime') }}
									</div>
									<div class="text-sm font-medium">
										{{ useNumber(formatDateToIranTime(item.tTime)) }}
									</div>
								</div>
								<div class="flex justify-between">
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ $t('feePercentage') }}
									</div>
									<div class="text-sm font-medium">
										{{ useNumber(item.perc) }}
									</div>
								</div>
								<div class="flex justify-between">
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ $t('feeAmount') }}
									</div>
									<div class="text-sm font-medium">
										{{ useNumber(item.tFee) }}
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center py-4">
							<UPagination
								:model-value="20"
								:page-count="20"
								:total="20"
								:max="6"
								size="xl"
								ul-class="flex space-x-2 bg-blue-500 border-none"
								li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
								button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
								button-class-inactive="bg-green-700 hover:bg-gray-600"
								button-class-active="bg-blue-500"
								class="my-14"
								@update:model-value="onPageChangeReceived"
							/>
						</div>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconSend from '~/assets/svg-icons/profile/send.svg';
import IconUser from '~/assets/svg-icons/profile/user.svg';
import IconGift from '~/assets/svg-icons/gift.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconUserInvite from '~/assets/svg-icons/menu/user-fill.svg';
import IconNote from '~/assets/svg-icons/profile/note.svg';
import IconQuestion from '~/assets/svg-icons/profile/question.svg';
import { useNumber } from '~/composables/useNumber';
import ModalInviteFriends from '~/components/pages/Site/Account/InviteFriends/ModalInviteFriends.vue';
import EditCodeInviteFriends from '~/components/pages/Site/Account/InviteFriends/EditCodeInviteFriends.vue';
import IconEdit from '~/assets/svg-icons/profile/edit.svg';
import { referralRepository } from '~/repositories/referral.repository';
import type { InviteList, ReceivedList } from '~/types/response/referral.types';
import type { GetInvitationParams } from '~/types/base.types';
import { formatDateToIranTime } from '~/utils/date-time';

definePageMeta({
	layout: 'account-single',
});

const currentPageInvite = ref<number>(1);
const currentPageReceived = ref<number>(1);

const { $api } = useNuxtApp();
const referralRepo = referralRepository($api);

const inviteList = ref<InviteList[]>();
const ReceivedList = ref<ReceivedList[]>();

const paramsInvite = ref<GetInvitationParams>({
	getMode: '',
	sortMode: '',
	assessmentCurrencyId: '3',
	pageNumber: '1',
	pageSize: '20',
});
const paramsReceived = ref<GetInvitationParams>({
	getMode: '',
	sortMode: '',
	assessmentCurrencyId: '3',
	pageNumber: '1',
	pageSize: '20',
});
const getInviteList = async () => {
	try {
		const { result } = await referralRepo.getInvitation(paramsInvite.value);
		inviteList.value = result.rows;
		currentPageInvite.value = result.totalCount;
	}
	catch (error) {
		console.log(error);
	}
};

const getcommissionList = async () => {
	try {
		const { result } = await referralRepo.getCommissionReceived(paramsReceived.value);
		ReceivedList.value = result.rows;
		currentPageReceived.value = result.totalCount;
	}
	catch (error) {
		console.log(error);
	}
};
onMounted(async () => {
	await Promise.all([
		getInviteList(),
		getcommissionList(),
	]);
});

function onPageChangeInvite(newPage: number) {
	currentPageInvite.value = newPage;
}
function onPageChangeReceived(newPage: number) {
	currentPageReceived.value = newPage;
}
const showModalInviteFriends = ref(false);
const showEditCodeInviteFriends = ref(false);

const openModalInviteFriends = () => {
	showModalInviteFriends.value = true;
};

const closeModalInviteFriends = () => {
	showModalInviteFriends.value = false;
};
const openEditCodeInviteFriends = () => {
	showEditCodeInviteFriends.value = true;
};
const closeEditCodeInviteFriends = () => {
	showEditCodeInviteFriends.value = false;
};
const showDescription = ref(true);

const toggleDescription = () => {
	showDescription.value = !showDescription.value;
};
</script>
