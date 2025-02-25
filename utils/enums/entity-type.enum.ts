enum EntityType {
	UserRegister = 1310131,
	UserLogin = 1310231,
	UserLogout = 1310331,
	User2FAEnabled = 1310431,
	User2FADisabled = 1310433,
	UserNickNameChanged = 1310511,
	UserBasicInfoUpdated = 1310513,
	UserAvatarChanged = 1310521,
	UserReferralCodeChanged = 1310531,
	UserChildrenDiscountPercChanged = 1310541,
	UserPasswordForgetRequest = 1310611,
	UserPasswordChanged = 1310621,
	UserEmailChanged = 1310631,
	UserMobileChanged = 1310641,
	UserAntiphishingPhraseChanged = 1310651,
	UserWithdrawPinCodeChanged = 1310661,
	UserFrozen = 1310811,
	UserDeleted = 1310881,
	UserFetchInfo = 2241131,
	UserLiquidedToWLOwner = 2243131,
	UserFreeze = 2243141,
	UserUnfreeze = 2243151,
	UserAssetManipulation = 2243161,
}

enum RejectReason {
	Any = 0,
	UserDocsRejectReason = 2130151,
	WithdrawRejectReason = 2130161,
	OrderRejectReason = 2130171,
	FreezeReason = 2130181,
	AccountDeleteReason = 2130191,
};

export {
	RejectReason,
	EntityType,
};
