import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './js/routes'
import configureStore from './js/store/configure-store'
import { Provider } from 'react-redux'

import 'typeface-spectral'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './assets/scss/main.scss'
import './js/modules/database'

const rootEl = document.getElementById('root')
export const store = configureStore({})
export const AppContext = React.createContext({})

const renderComponent = (Component) => {
    ReactDOM.render(
        <>
            <Provider store={store}>
                <Component />
            </Provider>
        </>,
        rootEl,
    )
}

renderComponent(App)
