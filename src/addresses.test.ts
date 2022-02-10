import test from 'ava'
import { addresses } from './addresses'

test('Returns mainnet address when the passed network is mainnet', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, undefined)
})

test('Returns ropsten address when the passed network is ropsten', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, '0xEd456cE8c099ec4862435B7ec5F2367d40017040')
})

test('Returns arbitrum rinkeby address when the passed network is arbitrum-rinkeby', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, '0x9bCb3F85b0b01968F5e0100652a53958c8558452')
})

test('Returns undefined when the passed network is arbitrum-one', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, '0x26f3DC14C3B87925cb518c55D9D8968B24Be0FE4')
})

test('Returns arbitrum rinkeby address when the passed network is polygon-mumbai', async (t) => {
	const res = await addresses({ network: 'polygon-mumbai' })
	t.is(res, '0x11DaCce8DBfe4c34e5e243FA9a8b12228424d4Bb')
})

test('Returns undefined when the passed network is polygon-mainnet', async (t) => {
	const res = await addresses({ network: 'polygon-mainnet' })
	t.is(res, '0xAEb8cE03Eb55A8fC0bAb96898df4A0C5e11dBEEC')
})
