import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { Button } from '.'

// TODO: custom vote options
// TODO: custom votes?
// TODO: average of votes
export const VoteButtonGroup = ({ name }) => {
  const sharedState = useSyncedStore(store)

  const setVote = voteValue => {
    sharedState.players[name].vote = voteValue
    // show votes if you are the last person to vote
    if (
      Object.keys(sharedState.players).every(
        player => !!sharedState.players[player].vote
      )
    ) {
      sharedState.gameState.showVotes = true
    }
  }

  const { gameState: { selectedVoteOptionsLabel }, voteOptions } = sharedState

  return (
    <section css={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {voteOptions[selectedVoteOptionsLabel].map(i => (
        <Button key={i} onClick={() => setVote(i)}>
          {i}
        </Button>
      ))}
    </section>
  )
}
