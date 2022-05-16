import React from 'react'

export const Input = React.forwardRef(
  ({ css, className, icon, ...restProps }, ref) => (
    <div
      css={{
        borderRadius: '16px',
        border: '1px solid #ccc',
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: 16
      }}
      className={className}
    >
      {icon && <span css={{ margin: '6px 0 0 10px' }}>{icon}</span>}
      <input
        ref={ref}
        autoComplete='off'
        css={{
          border: 'none',
          outline: 'none',
          margin: '4px 8px 4px 4px',
          fontSize: 16,
          flexGrow: 0.9,
          backgroundColor: 'transparent'
        }}
        {...restProps}
      />
    </div>
  )
)
