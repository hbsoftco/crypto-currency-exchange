import { helpers } from '@vuelidate/validators';

export const complexPassword = helpers.withMessage(
	useT('passwordMustBeComplex'),
	(value: string) =>
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value),
);
