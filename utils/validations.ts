import { required, helpers } from '@vuelidate/validators';

const validations = {
	required: helpers.withMessage('thisFieldIsRequired', required),
	phone: helpers.withMessage('pleaseEnterValidPhoneNumber', (value: string) => {
		return /^\+?\d{1,3}[- ]?\(?\d\)?[- ]?\d{1,8}$/.test(value);
	}),
	numeric: helpers.withMessage('thisFieldMustBeNumeric', (value: number) => {
		return !isNaN(parseFloat(String(value))) && isFinite(value);
	}),
	greaterThanZero: helpers.withMessage('valueMustBeGreaterThanZero', (value: number | string) => {
		const number = parseFloat(String(value));
		return number > 0;
	}),
	externalServerValidation: () => true,

};

export type Validations = typeof validations;

export default validations;
