import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'

export const Menu = () => {
  const sharedState = useSyncedStore(store)

  const clearVotes = () => {
    Object.keys(sharedState.players).forEach(player => {
      sharedState.players[player].vote = null
    })
    sharedState.gameState.showVotes = false
  }

  return (
    <>
      <button onClick={clearVotes}>Clear Votes</button>
      &nbsp;
      <button
        onClick={() => {
          sharedState.gameState.showVotes = true
        }}
      >
        Show Votes
      </button>
      <br />
      <br />
      Vote Options:
      &nbsp;
      <select
        value={sharedState.gameState.voteOptions ?? '1 to 10'}
        onChange={event => {
          sharedState.gameState.voteOptions = event.target.value
          clearVotes()
        }}
      >
        <option value='1 to 10'>1 to 10</option>
        <option value='modified fibonacci'>modified fibonacci</option>
        <option value='t-shirt sizes'>t-shirt sizes</option>
      </select>
    </>
  )
}
