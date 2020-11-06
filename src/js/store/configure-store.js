import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers/index'

const reducer = combineReducers({
  ...reducers,
  form: formReducer,
})

export const history = createHashHistory()

function configureStoreProd(initialState) {
  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(thunk)),
  )
}

function configureStoreDev(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
