import { useRef, forwardRef, useImperativeHandle } from 'react'
import { Card } from '.'

export const Popup = forwardRef(({ children, ...restProps }, ref) => {
  const popupRef = useRef()

  useImperativeHandle(ref, () => ({
    showModal: () => {
      popupRef.current.showModal()
    },
    close: () => {
      popupRef.current.close()
    }
  }))

  return (
    <dialog
      ref={popupRef}
      onClick={event => {
        if (event.target.tagName === 'DIALOG') {
          popupRef.current.close()
        }
      }}
      css={{
        border: 'none',
        backgroundColor: 'transparent',
        '&::backdrop': {
          backgroundColor: '#0008'
        }
      }}
    >
      <Card {...restProps}>{children}</Card>
    </dialog>
  )
})
