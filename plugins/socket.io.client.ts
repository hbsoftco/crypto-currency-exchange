import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { useAuth } from '~/composables/auth/useAuth';

export default defineNuxtPlugin(async (nuxtApp) => {
	try {
		const socketBaseURL = useEnv('socketBaseUrl');

		const publicSocket: Socket = io(`${socketBaseURL}/v1/wss/public`, {
			transports: ['websocket'],
		});

		console.log('publicSocket==================>', publicSocket);

		const { getSocketListenKey } = useAuth();
		const listenKey = await getSocketListenKey();
		console.log(listenKey);

		const privateSocket: Socket = io(`${socketBaseURL}/v1/wss/private`, {
			transports: ['websocket'],
			query: {
				listenkey: listenKey,
			},
		});

		nuxtApp.provide('publicSocket', publicSocket);
		nuxtApp.provide('privateSocket', privateSocket);
	}
	catch (error) {
		console.log(error);
	}
});
