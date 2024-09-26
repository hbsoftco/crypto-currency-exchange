import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
	const socketBaseURL = useEnv('socketBaseUrl');

	const socket: Socket = io(socketBaseURL, {
		transports: ['websocket'],
	});

	nuxtApp.provide('socket', socket);
});
