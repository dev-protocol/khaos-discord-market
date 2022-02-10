import axios from 'axios'
import { FunctionAuthorizer } from '@devprotocol/khaos-core'
import { unless } from 'ramda'

export const authorize: FunctionAuthorizer = async ({ message, secret }) => {
	return postViewerPermission(message, secret)
}

type YoutubeAPIResponse = Array<{
	id: string,
	owner: boolean,
}>

async function postViewerPermission(
	channelId: string,
	token: string
): Promise<boolean> {
	const res = await post(token)
	let result = !Array.isArray(res)
		? []
		:
		res.filter(function (value: { id: string }) {
			return value.id === channelId;
		})

	return res instanceof Error
		? false
		: result.length > 0
			? result[0].owner === true
				? true
				: false
			: false
}

async function post(token: string): Promise<YoutubeAPIResponse | Error> {
	const youtubeDataApiUrl = `https://discordapp.com/api/users/@me/guilds`
	return axios
		.get(youtubeDataApiUrl, { headers: { Authorization: "Bearer " + token } })
		.then((response) => response.data)
		.catch((err: Error) => err)
}
