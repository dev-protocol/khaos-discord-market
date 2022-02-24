import test from 'ava'
import { addresses } from './addresses'

test('Returns arbitrum rinkeby address when the passed network is arbitrum-rinkeby', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, '0x78D3dA4dAFB2c51C0Ee7e598C871ce4d73cF728e')
})

test('Returns undefined when the passed network is arbitrum-one', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, '0xFAd92AB19dcde96d63ae720eB0DFF2dd485C65AC')
})

test('Returns arbitrum rinkeby address when the passed network is polygon-mumbai', async (t) => {
	const res = await addresses({ network: 'polygon-mumbai' })
	t.is(res, '0x18664CD5dFF515Da2304c80E4c9216e873A4C96E')
})

test('Returns undefined when the passed network is polygon-mainnet', async (t) => {
	const res = await addresses({ network: 'polygon-mainnet' })
	t.is(res, '0xBa4Ba49CeF141A1469F92Ff8f10541487cf85e15')
})
