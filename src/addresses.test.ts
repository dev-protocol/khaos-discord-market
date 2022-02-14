import test from 'ava'
import { addresses } from './addresses'

test('Returns arbitrum rinkeby address when the passed network is arbitrum-rinkeby', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, undefined)
})

test('Returns undefined when the passed network is arbitrum-one', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, undefined)
})

test('Returns arbitrum rinkeby address when the passed network is polygon-mumbai', async (t) => {
	const res = await addresses({ network: 'polygon-mumbai' })
	t.is(res, undefined)
})

test('Returns undefined when the passed network is polygon-mainnet', async (t) => {
	const res = await addresses({ network: 'polygon-mainnet' })
	t.is(res, undefined)
})
