import { useState, useRef } from 'react'
import { Icon } from '@rmwc/icon'
import { Snackbar } from '@rmwc/snackbar'
import '@material/snackbar/dist/mdc.snackbar.css'
import '@material/button/dist/mdc.button.css'
import '@material/ripple/dist/mdc.ripple.css'
import { Popup, Button } from '.'

export const ShareSessionLink = () => {
  const popupRef = useRef()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  return (
    <>
      <Icon
        icon='share'
        onClick={() => {
          popupRef.current.showModal()
        }}
        css={{
          fontSize: 32,
          padding: 8,
          cursor: 'pointer'
        }}
      />
      <Popup ref={popupRef} css={{ padding: 24, width: 'min(450px, 80vw)' }}>
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
          Share
          <Icon
            icon='close'
            onClick={() => {
              popupRef.current.close()
            }}
            css={{ cursor: 'pointer' }}
          />
        </div>
        {/* TODO: share on email, slack */}
        <div
          css={{
            marginTop: 24,
            padding: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#eee',
            borderRadius: 12
          }}
        >
          <small>{window.location.href}</small>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setSnackbarOpen(true)
              setTimeout(() => {
                setSnackbarOpen(false)
              }, 5000)
            }}
          >
            Copy Link
          </Button>
        </div>
        <Snackbar
          leading
          open={snackbarOpen}
          message='Link copied to clipboard'
        />
      </Popup>
    </>
  )
}
