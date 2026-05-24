import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { SocketProvider } from './socket/SocketContext'

const App = () => {
  return (
    <SocketProvider>
    <AppRoutes/>
    </SocketProvider>
  )
}

export default App