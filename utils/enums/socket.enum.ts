export enum PublicTopic {
	SPOT_TICKER = 'spot@public.ticker.v1',
	SPOT_SNAPSHOT = 'spot@public.snapshot.v1',
	FUTURES_TICKER = 'futures@public.ticker.v1',
	FUTURES_SNAPSHOT = 'futures@public.snapshot.v1',
}

export enum PrivateTopic {
	ASSET_BOX = 'account@private.asset.box.v1',
	ASSET_LIST = 'account@private.asset.list.v1',
	PROFILE = 'account@private.profile.info.v1',
}

export enum SocketId {
	PING = '12',
	FUTURES_TICKER = '24',
	SPOT_TICKER = '25',
	SPOT_TICKER_EXCHANGE = '26',
	ASSET_LIST = '35',
}
