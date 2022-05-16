export const Layout = ({ children }) => (
  <div
    css={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#eee'
    }}
  >
    <header
      css={{
        textAlign: 'center',
        marginTop: '8vh',
        position: 'absolute'
      }}
    >
      <h1
        css={{
          margin: 0,
          fontFamily: 'Bungee Shade',
          fontSize: 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)'
        }}
      >
        POINTING POKER
      </h1>
    </header>
    <div
      css={{
        border: '1px solid lightgrey',
        borderRadius: 16,
        padding: '32px 16px',
        width: 'max-content',
        margin: 'auto'
      }}
    >
      {children}
    </div>
  </div>
)
