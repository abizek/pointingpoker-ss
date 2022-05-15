import { useParams } from 'react-router-dom'

export const ShareSessionLink = () => {
  const { customRoom } = useParams()

  return customRoom
    ? (
      <>
        <br />
        <br />
        Share:{' '}
        <a href={`${window.location.origin}/${customRoom}`}>
          {window.location.origin}/{customRoom}
        </a>
      </>
      )
    : null
}
