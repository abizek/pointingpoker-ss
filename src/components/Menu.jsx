import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { Button } from '.'
import { Icon } from '@rmwc/icon'

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
      <section
        css={{
          display: 'flex',
          width: '100%',
          margin: '24px 0',
          columnGap: 8,
          alignItems: 'center'
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
        <Icon icon='more_vert' />
      </section>
      Vote Options: &nbsp;
      <select
        value={sharedState.gameState.selectedVoteOptionsLabel}
        onChange={event => {
          sharedState.gameState.selectedVoteOptionsLabel = event.target.value
          clearVotes()
        }}
      >
        <option value='0 to 10'>0 to 10</option>
        <option value='Modified fibonacci'>Modified fibonacci</option>
        <option value='T-shirt sizes'>T-shirt sizes</option>
      </select>
    </>
  )
}
