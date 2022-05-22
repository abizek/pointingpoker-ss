import { forwardRef } from 'react'

export const Card = forwardRef(({ children, ...restProps }, ref) => (
  <div
    css={{
      border: '1px solid lightgrey',
      borderRadius: 16,
      width: 'max-content',
      backgroundColor: '#f8f8f8'
    }}
    {...restProps}
    ref={ref}
  >
    {children}
  </div>
))
