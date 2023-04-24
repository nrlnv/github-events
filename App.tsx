import React from 'react'
import { Provider } from 'react-redux'

// navigation
import MainNavigation from './src/navigation/mainNavigation'

// redux
import store from './src/store'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
