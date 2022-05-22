import { Card } from '.'

export const Layout = ({ children }) => (
  <>
    <header
      css={{
        position: 'absolute', // FIXME: not use absolute positioning
        display: 'flex',
        width: '100vw',
        justifyContent: 'center'
      }}
    >
      <h1
        css={{
          margin: 0,
          fontFamily: 'Bungee Shade',
          fontSize: 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)',
          marginLeft: '2vw',
          marginTop: '6vh'
        }}
      >
        POINTING POKER
      </h1>
    </header>
    <div
      css={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
        background: '#eee'
      }}
    >
      <Card>{children}</Card>
    </div>
  </>
)
