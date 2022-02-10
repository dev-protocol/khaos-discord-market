import axios from 'axios'
import { FunctionAuthorizer } from '@devprotocol/khaos-core'

export const authorize: FunctionAuthorizer = async ({ message, secret }) => {
	return postViewerPermission(message, secret)
}

type YoutubeAPIResponse = {
	readonly items: readonly [{ readonly id: string }]
}

async function postViewerPermission(
	channelId: string,
	token: string
): Promise<boolean> {
	const res = await post(token)
	return res instanceof Error
		? false
		: res.items
		? res.items[0].id === channelId
			? true
			: false
		: false
}

async function post(token: string): Promise<YoutubeAPIResponse | Error> {
	const youtubeDataApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=${token}`
	return axios
		.get(youtubeDataApiUrl)
		.then((response) => response.data)
		.catch((err: Error) => err)
}
