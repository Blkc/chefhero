import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import './App.scss'

import MainApp from './containers/MainApp'
import SearchApp from './containers/SearchApp'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      {/* <MainApp /> */}
      <SearchApp />
    </Provider>
  );
}

export default App;
