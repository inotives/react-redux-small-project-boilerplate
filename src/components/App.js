import React from 'react'
import NavBar from './NavBar';

export default function App({ children }) {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '1.5em' }}>
        {children}
      </div>

    </div>
  )
}
