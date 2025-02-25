export enum Priority {
	HIGH = 31,
	MEDIUM = 61,
	LOW = 91,
}

export enum SendType {
	Email = 23,
	SMS = 33,
}

export enum BankAccountType {
	IRANIAN_BANKS = 1310131,
}

export enum ActionType {
	USER_REGISTER = '1310131',
	USER_LOGIN = '1310231',
	USER_LOGOUT = '1310331',
	USER_2FA_ENABLED = '1310431',
	USER_2FA_DISABLED = '1310433',
	USER_NICKNAME_CHANGED = '1310511',
	USER_BASIC_INFO_UPDATED = '1310513',
	USER_AVATAR_CHANGED = '1310521',
	USER_REFERRAL_CODE_CHANGED = '1310531',
	USER_CHILDREN_DISCOUNT_PERC_CHANGED = '1310541',
	USER_PASSWORD_FORGET_REQUEST = '1310611',
	USER_PASSWORD_CHANGED = '1310621',
	USER_EMAIL_CHANGED = '1310631',
	USER_MOBILE_CHANGED = '1310641',
	USER_ANTIPHISHING_PHRASE_CHANGED = '1310651',
	USER_WITHDRAW_PINCODE_CHANGED = '1310661',
	USER_FROZEN = '1310811',
	USER_DELETED = '1310881',
	USER_FETCH_INFO = '2241131',
	USER_LIQUIDED_TO_WL_OWNER = '2243131',
	USER_FREEZE = '2243141',
	USER_UNFREEZE = '2243151',
	USER_ASSET_MANIPULATION = '2243161',
}
