/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import axios, { AxiosRequestConfig } from 'axios'
import { authorize } from './authorize'

let get: sinon.SinonStub<
	[url: string, data?: any, config?: AxiosRequestConfig | undefined],
	Promise<unknown>
>

let discordAPIUrl: string

test.before(() => {
	get = sinon.stub(axios, 'get')
	process.env.GUILD_ID = 'dummy-guild-id'
	process.env.ACCESS_TOKEN = 'dummy-access-token'
	discordAPIUrl = `https://discordapp.com/api/users/@me/guilds`
})

test('Successful authentication.', async (t) => {
	get
		.withArgs(discordAPIUrl, {
			headers: { Authorization: 'Bearer ' + process.env.ACCESS_TOKEN },
		})
		.resolves({
			status: 200,
			data: [{ id: process.env.GUILD_ID, permissions: 8 }],
		})
	const res = await authorize({
		message: process.env.GUILD_ID,
		secret: process.env.ACCESS_TOKEN,
	} as any)
	t.true(res)
})

test('If the user does not send his channel id, the authentication fails.', async (t) => {
	get
		.withArgs(discordAPIUrl, {
			headers: { Authorization: 'Bearer ' + process.env.ACCESS_TOKEN },
		})
		.resolves({
			status: 200,
			data: [{ id: process.env.GUILD_ID, permissions: 8 }],
		})
	const res = await authorize({
		message: 'wrong-dummy-guild-id',
		secret: process.env.ACCESS_TOKEN,
	} as any)
	t.false(res)
})

test('If the user send a channel id that has no sufficient permissions, the authentication fails.', async (t) => {
	get
		.withArgs(discordAPIUrl, {
			headers: { Authorization: 'Bearer ' + process.env.ACCESS_TOKEN },
		})
		.resolves({
			status: 200,
			data: [{ id: process.env.GUILD_ID, permissions: 1099511627767 }],
		})
	const res = await authorize({
		message: process.env.GUILD_ID,
		secret: process.env.ACCESS_TOKEN,
	} as any)
	t.false(res)
})

test('If the access token does not exist, the authentication fails', async (t) => {
	const wrongToken = 'wrong-dummy-access-token'
	get
		.withArgs(discordAPIUrl, {
			headers: { Authorization: 'Bearer ' + wrongToken },
		})
		.resolves({
			status: 401,
			data: {
				message: '401: Unauthorized',
				code: 0,
			},
		})
	const res = await authorize({
		message: process.env.GUILD_ID,
		secret: 'wrong-dummy-access-token',
	} as any)
	t.false(res)
})
