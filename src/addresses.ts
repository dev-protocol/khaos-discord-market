import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'arbitrum-rinkeby'
		? undefined
		: net === 'polygon-mumbai'
		? undefined
		: net === 'polygon-mainnet'
		? undefined
		: net === 'arbitrum-one'
		? undefined
		: undefined
