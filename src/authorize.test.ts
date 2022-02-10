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

let youtubeDataApiUrl: string

test.before(() => {
	get = sinon.stub(axios, 'get')
	process.env.CHANNEL_ID = 'dummy-channel-id'
	process.env.ACCESS_TOKEN = 'dummy-access-token'
	youtubeDataApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=${process.env.ACCESS_TOKEN}`
})

test('Successful authentication.', async (t) => {
	get.withArgs(youtubeDataApiUrl).resolves({
		status: 200,
		data: {
			items: [{ id: process.env.CHANNEL_ID }],
		},
	})
	const res = await authorize({
		message: process.env.CHANNEL_ID,
		secret: process.env.ACCESS_TOKEN,
	} as any)
	t.true(res)
})

test('If the user does not send his channel id, the authentication fails.', async (t) => {
	get.withArgs(youtubeDataApiUrl).resolves({
		status: 200,
		data: {
			items: [{ id: process.env.CHANNEL_ID }],
		},
	})
	const res = await authorize({
		message: 'wrong-dummy-channel-id',
		secret: process.env.ACCESS_TOKEN,
	} as any)
	t.false(res)
})

test('If the access token does not exist, the authentication fails', async (t) => {
	const wrongToken = 'wrong-dummy-access-token'
	youtubeDataApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=${wrongToken}`
	get.withArgs(youtubeDataApiUrl).resolves({
		status: 401,
		data: {
			error: {
				code: 401,
				message:
					'Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.',
				errors: [
					{
						message: 'Invalid Credentials',
						domain: 'global',
						reason: 'authError',
						location: 'Authorization',
						locationType: 'header',
					},
				],
				status: 'UNAUTHENTICATED',
			},
		},
	})
	const res = await authorize({
		message: process.env.CHANNEL_ID,
		secret: 'wrong-dummy-access-token',
	} as any)
	t.false(res)
})
