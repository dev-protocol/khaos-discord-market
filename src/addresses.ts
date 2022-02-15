import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'arbitrum-rinkeby'
		? '0x78D3dA4dAFB2c51C0Ee7e598C871ce4d73cF728e'
		: net === 'polygon-mumbai'
			? '0x18664CD5dFF515Da2304c80E4c9216e873A4C96E'
			: net === 'polygon-mainnet'
				? undefined
				: net === 'arbitrum-one'
					? undefined
					: undefined
