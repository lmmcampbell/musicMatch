import React from 'react'
import {NavbarComponent} from './components'
import Routes from './routes'
// import { ChakraProvider } from "@chakra-ui/react"

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <Routes />
    </div>
  )
}

export default App
