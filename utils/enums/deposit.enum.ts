enum DepositType {
	ANY = '0',
	CRYPTO = '21',
	FIAT = '11',
	INTERNAL = '31',
}

enum OutputDepositType {
	CRYPTO = 11,
	FIAT_BANK_GATEWAY = 21,
	FIAT_BANK_MEMO = 23,
	FIAT_CLAIMED = 25,
	INTERNAL_WITHDRAW = 31,
}

enum DepositStatus {
	INITIALIZED = 0,
	SMALL = 11,
	DELAYED = 21,
	REJECTED = 41,
	SUCCEEDED = 91,
}

export {
	DepositType,
	OutputDepositType,
	DepositStatus,
};
