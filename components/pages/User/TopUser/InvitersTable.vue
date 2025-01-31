<template>
	<div>
		<div class="px-1  md:px-10 pt-2 md:pt-0 mt-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr
						class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right"
					>
						<th class="text-center text-sm font-bold py-3">
							{{ $t("rank") }}
						</th>
						<th class="text-center text-sm font-bold py-3">
							{{ $t("account") }}
						</th>
						<th class="text-center text-sm font-bold py-3">
							{{ $t("feeReceived") }}
						</th>
						<th class="text-center text-sm font-bold py-3">
							{{ $t("directInvitation") }}
						</th>
						<th class="text-center text-sm font-bold py-3">
							{{ $t("indirectInvitation") }}
						</th>
					</tr>
				</thead>

				<tbody v-if="users.length">
					<InvitersTableRow
						v-for="(user, index) in users"
						:key="user.uid"
						:user="user"
						:index="index"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { BestListUser } from '~/types/response/user.types';
import InvitersTableRow from '~/components/pages/User/TopUser/InvitersTableRow.vue';

interface PropsDefinition {
	users: BestListUser[];
}

defineProps<PropsDefinition>();
</script>
