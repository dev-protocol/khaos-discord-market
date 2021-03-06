/* eslint-disable functional/no-let */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import { oraclize } from './oraclize'
import { PublicSignatureOptions, QueryData } from '@devprotocol/khaos-core'

//success
test('Returns success when the assert is passed; same repo, same account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'guild-id',
		id: 'discord-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { discordGuild: 'guild-id', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'mainnet' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'guild-id')
		t.is(res!.status, 0)
		t.is(res!.statusMessage, 'success')
	})
})

test('Returns failure when the assert is not passed; different repo, same account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'different-guild-id',
		id: 'discord-market',
		address: '0x1234',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { discordGuild: 'guild-id', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'mainnet' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'different-guild-id')
		t.is(res!.status, 2)
		t.is(res!.statusMessage, 'error: test1 = false, test2 = true')
	})
})

test('Returns failure when the assert is not passed; same repo, different account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'guild-id',
		id: 'discord-market',
		address: '0x12345',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { discordGuild: 'guild-id', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'mainnet' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'guild-id')
		t.is(res!.status, 2)
		t.is(res!.statusMessage, 'error: test1 = true, test2 = false')
	})
})

test('Returns failure when the assert is not passed; different repo, different account', async (t) => {
	const signatureOptions: PublicSignatureOptions = {
		message: 'different-guild-id',
		id: 'discord-market',
		address: '0x12345',
	}
	const query: QueryData = {
		publicSignature: 'dummy-publicSignature',
		allData: { discordGuild: 'guild-id', account: '0x1234' } as any,
		transactionhash: 'dummy-transaction-hash',
	}
	const data = await Promise.all([
		oraclize({ signatureOptions, query, network: 'mainnet' }),
	])
	data.forEach((res) => {
		t.is(res!.message, 'different-guild-id')
		t.is(res!.status, 2)
		t.is(res!.statusMessage, 'error: test1 = false, test2 = false')
	})
})
