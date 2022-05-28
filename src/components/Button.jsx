export const Button = ({ children, ...restProps }) => (
  <button
    css={{
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: 12,
      padding: '6px 16px',
      letterSpacing: -0.4,
      fontSize: 14,
      cursor: 'pointer',
      minHeight: 38,
      outline: 'none',
      '&:hover': {
        backgroundColor: '#eee'
      }
    }}
    {...restProps}
  >
    {children}
  </button>
)
