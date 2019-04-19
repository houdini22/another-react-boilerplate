import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers/index'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
})

export const history = createHistory()

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [thunk, reactRouterMiddleware]

  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  )
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [thunk, reactRouterMiddleware]

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
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
