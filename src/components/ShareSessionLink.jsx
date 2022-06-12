import { useState, useRef } from 'react'
import { Icon } from '@rmwc/icon'
import { Snackbar } from '@rmwc/snackbar'
import '@material/snackbar/dist/mdc.snackbar.css'
import '@material/button/dist/mdc.button.css'
import '@material/ripple/dist/mdc.ripple.css'
import { Popup, Button } from '.'
import slackLogoUrl from '../slack-logo.svg'

export const ShareLink = ({ icon, text, href, onClick }) => (
  <a
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'unset',
      outline: 'none'
    }}
    href={href}
    target='_blank'
    rel='noreferrer'
    onClick={onClick}
  >
    {icon}
    <span css={{ fontSize: 12 }}>{text}</span>
  </a>
)

export const ShareSessionLink = () => {
  const popupRef = useRef()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const copyLinkAndNotify = () => {
    navigator.clipboard.writeText(window.location.href)
    setSnackbarOpen(true)
    setTimeout(() => {
      setSnackbarOpen(false)
    }, 5000)
  }

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
        <div
          css={{
            marginTop: 16,
            padding: 8,
            display: 'flex',
            gap: 24
          }}
        >
          <ShareLink
            icon={<Icon icon='mail_outline' css={{ fontSize: 64 }} />}
            text='Email'
            href={encodeURI(`mailto:?subject=Pointing Poker Session&body=Hey,\nI'm inviting you to join this pointing poker session - ${window.location.href}`)}
          />
          <ShareLink
            icon={<img src={slackLogoUrl} css={{ width: 50, padding: 7 }} />}
            text='Slack'
            href='slack://'
            onClick={copyLinkAndNotify}
          />
        </div>
        <div
          css={{
            marginTop: 16,
            padding: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#eee',
            borderRadius: 12
          }}
        >
          <small css={{ paddingLeft: 4 }}>{window.location.href}</small>
          <Button
            onClick={copyLinkAndNotify}
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
