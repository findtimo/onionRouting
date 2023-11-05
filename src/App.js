import React from 'react'
import './App.css'
import Connector from './Connector'
import { MantineProvider } from '@mantine/core';
// export NODE_OPTIONS=--openssl-legacy-provider

function App () {
  return (
    <MantineProvider>
    <div className='app'>
      {/* <h2></h2> */}
      <Connector/>
    </div>
    </MantineProvider>
  )
}

export default App
