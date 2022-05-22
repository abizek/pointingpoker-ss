import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { Button } from '.'

const voteOptions = {
  '1 to 10': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'modified fibonacci': [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
  't-shirt sizes': ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
}

// TODO: custom vote options
// TODO: custom votes?
// TODO: average of votes
export const VoteOptionsButtonGroup = ({ name }) => {
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

  return (
    <section css={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {voteOptions[sharedState.gameState.voteOptions ?? '1 to 10'].map(i => (
        <Button key={i} onClick={() => setVote(i)}>
          {i}
        </Button>
      ))}
    </section>
  )
}
