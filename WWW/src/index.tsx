import * as React from "react"
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import {App} from './js/routes'
import configureStore, {history} from './js/store/configure-store'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

import 'react-custom-scroll/dist/customScroll.css'
import 'typeface-spectral'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './assets/scss/main.scss'
import './js/modules/database'

const rootEl = document.getElementById('root')
export const store = configureStore({})
export const AppContext = React.createContext({})

const renderComponent = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history}>
                    <Component/>
                </Router>
            </Provider>
        </AppContainer>,
        rootEl,
    )
}

renderComponent(App)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./js/routes', () => {
        renderComponent(App)
    })
}
