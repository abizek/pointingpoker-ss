import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { Button } from '.'

export const Menu = () => {
  const sharedState = useSyncedStore(store)

  const clearVotes = () => {
    Object.keys(sharedState.players).forEach(player => {
      sharedState.players[player].vote = null
    })
    sharedState.gameState.showVotes = false
  }

  const buttonClass = { flexGrow: 1 }

  return (
    <>
      <div
        css={{
          display: 'flex',
          width: '100%',
          margin: '24px 0',
          columnGap: 8
        }}
      >
        <Button onClick={clearVotes} css={buttonClass}>
          Clear Votes
        </Button>
        <Button
          onClick={() => {
            sharedState.gameState.showVotes = true
          }}
          css={buttonClass}
        >
          Show Votes
        </Button>
      </div>
      Vote Options: &nbsp;
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
