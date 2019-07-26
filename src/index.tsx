import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from "redux-saga"
import App from './components/App/App'
import reducer from './reducers/mainReducer'
import apiSaga from './sagas/api-saga'

const initialiseSagaMiddleware = createSagaMiddleware()


const store = createStore(
    reducer, composeWithDevTools(
    applyMiddleware(initialiseSagaMiddleware)
))

initialiseSagaMiddleware.run(apiSaga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
