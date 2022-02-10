import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'ropsten'
		? '0xEd456cE8c099ec4862435B7ec5F2367d40017040'
		: net === 'arbitrum-rinkeby'
		? '0x9bCb3F85b0b01968F5e0100652a53958c8558452'
		: net === 'polygon-mumbai'
		? '0x11DaCce8DBfe4c34e5e243FA9a8b12228424d4Bb'
		: net === 'polygon-mainnet'
		? '0xAEb8cE03Eb55A8fC0bAb96898df4A0C5e11dBEEC'
		: net === 'arbitrum-one'
		? '0x26f3DC14C3B87925cb518c55D9D8968B24Be0FE4'
		: undefined
