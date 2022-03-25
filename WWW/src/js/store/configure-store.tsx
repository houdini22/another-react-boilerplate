import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers'

const reducer = combineReducers({
    ...reducers,
    form: formReducer,
})

function configureStoreProd(initialState) {
    return createStore(reducer, initialState, compose(applyMiddleware(thunk)))
}

function configureStoreDev(initialState) {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    )

    return store
}

const configureStore =
    process.env.NODE_ENV === 'production'
        ? configureStoreProd
        : configureStoreDev

export default configureStore
