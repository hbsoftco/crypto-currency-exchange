import { defineStore } from 'pinia';

type VerificationType = {
	verificationId: number;
	userId: number;
	wloId: number;
	type: 'mobile' | 'email';
	username: string;
};

export const useVerificationStore = defineStore('verification', () => {
	const verificationData = reactive<VerificationType>({
		verificationId: 32,
		userId: 23,
		wloId: 23,
		type: 'email',
		username: 'hossein.bajan@gmail.com',
	});

	const setVerificationData = (data: VerificationType) => {
		verificationData.verificationId = data.verificationId;
		verificationData.userId = data.userId;
		verificationData.wloId = data.wloId;
		verificationData.type = data.type;
		verificationData.username = data.username;
	};

	return { verificationData, setVerificationData };
});
