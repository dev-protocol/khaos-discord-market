import axios from 'axios'
import { FunctionAuthorizer } from '@devprotocol/khaos-core'
import { unless } from 'ramda'

const REQUIRED_PERMISSIONS = 8 // Administrator

export const authorize: FunctionAuthorizer = async ({ message, secret }) => {
	return postViewerPermission(message, secret)
}

type DiscordAPIResponse = ReadonlyArray<{
	readonly id: string
	readonly owner: boolean
}>

async function postViewerPermission(
	guildId: string,
	token: string
): Promise<boolean> {
	const res = await post(token)
	const result = !Array.isArray(res)
		? []
		: res.filter(function (value: { readonly id: string }) {
				return value.id === guildId
		  })

	return res instanceof Error
		? false
		: result.length > 0
		? (REQUIRED_PERMISSIONS & result[0].permissions) === REQUIRED_PERMISSIONS
			? true
			: false
		: false
}

async function post(token: string): Promise<DiscordAPIResponse | Error> {
	const discordAPIUrl = `https://discordapp.com/api/users/@me/guilds`
	return axios
		.get(discordAPIUrl, { headers: { Authorization: 'Bearer ' + token } })
		.then((response) => response.data)
		.catch((err: Error) => err)
}
