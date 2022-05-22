import { useEffect, useRef } from 'react'
import { Card } from '.'

export const Popup = ({ children, open, onClickOutside, ...restProps }) => {
  const popupRef = useRef()

  useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClickOutside()
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popupRef, open])

  // TODO: Use dialog element instead of Card
  return (
    <div
      css={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        zIndex: 2,
        backgroundColor: '#0008',
        top: 0,
        left: 0,
        display: open ? 'grid' : 'none',
        placeItems: 'center'
      }}
    >
      <Card ref={popupRef} css={{ zIndex: 3 }} {...restProps}>
        {children}
      </Card>
    </div>
  )
}
