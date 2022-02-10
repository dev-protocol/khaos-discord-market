import test from 'ava'
import { abi } from './abi'

test('Returns abi informations.', async (t) => {
	t.is(
		abi.toString(),
		'function khaosCallback(string memory _youtubeChannel, uint256 _status, string memory _message) external,event Query(string youtubeChannel, string publicSignature, address account)'
	)
})
