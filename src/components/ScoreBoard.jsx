import { useSyncedStore } from '@syncedstore/react'
import { Fragment } from 'react'
import { store } from '../store'

export const ScoreBoard = () => {
  const sharedState = useSyncedStore(store)

  const kickPlayer = playerName => {
    delete sharedState.players[playerName]
  }

  return Object.keys(sharedState.players).map(playerName => {
    const vote = sharedState.players[playerName].vote
    const active = sharedState.players[playerName].active
    return (
      playerName && (
        <Fragment key={playerName}>
          <br />
          {`${playerName}${vote ? '(voted)' : ''}${active ? '' : '(left)'}: ${
            sharedState.gameState.showVotes && vote ? vote : '?'
          }`}
          &nbsp;
          {!active && (
            <button onClick={() => kickPlayer(playerName)}>Kick</button>
          )}
        </Fragment>
      )
    )
  })
}
