import { Abi } from '@devprotocol/khaos-core'

export const abi: Abi = [
	'function khaosCallback(string memory _discordGuild, uint256 _status, string memory _message) external',
	'event Query(string discordGuild, string publicSignature, address account)',
]
