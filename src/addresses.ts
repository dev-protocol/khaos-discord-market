import { FunctionAddresses } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network: net }) =>
	net === 'arbitrum-rinkeby'
		? '0x78D3dA4dAFB2c51C0Ee7e598C871ce4d73cF728e'
		: net === 'polygon-mumbai'
		? '0x18664CD5dFF515Da2304c80E4c9216e873A4C96E'
		: net === 'polygon-mainnet'
		? '0xBa4Ba49CeF141A1469F92Ff8f10541487cf85e15'
		: net === 'arbitrum-one'
		? '0xFAd92AB19dcde96d63ae720eB0DFF2dd485C65AC'
		: undefined
