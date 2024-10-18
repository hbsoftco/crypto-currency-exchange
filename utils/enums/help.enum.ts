enum TagType {
	IDENTIFICATION = '478',
	V2FA = '479',
	WITHDRAW_PIN_CODE = '480',
	ANTIPHISHING_PHRASE = '481',
	PASSWORD_CHANGE = '482',
	ACCOUNT_DELETE = '483',
	ACCOUNT_FREEZE = '484',
	IP_RESTRICTION = '485',
	EMAIL_CHANGE = '486',
	MOBILE_CHANGE = '487',
	WB_CONTACT = '488',
	WB_ADDRESS = '489',
}
enum EntityType {
	ANY = '0',
	USER_Docs_REJECT_REASON = '2130151',
	WITHDRAW_REJECT_REASON = '2130161',
	ORDER_REJECT_REASON = '2130171',
	FREEZE_REASON = '2130181',
	ACCOUNT_DELETE_REASON = '2130191',
}
export {
	TagType,
	EntityType,
};
