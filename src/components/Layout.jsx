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
        position: 'absolute' // FIXME: not use absolute positioning
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
        width: 'max-content',
        margin: 'auto',
        backgroundColor: '#f8f8f8'
      }}
    >
      {children}
    </div>
  </div>
)
