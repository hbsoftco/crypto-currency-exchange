import { helpers } from '@vuelidate/validators';

export const complexPassword = helpers.withMessage(
	useT('passwordMustBeComplex'),
	(value: string) =>
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/.test(value),
);
