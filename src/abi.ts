import { Abi } from '@devprotocol/khaos-core'

export const abi: Abi = [
	'function khaosCallback(string memory _youtubeChannel, uint256 _status, string memory _message) external',
	'event Query(string youtubeChannel, string publicSignature, address account)',
]
