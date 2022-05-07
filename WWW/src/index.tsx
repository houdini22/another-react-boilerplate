import * as React from 'react'
import { App } from './js/routes'
import configureStore from './js/store/configure-store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
import 'typeface-spectral'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './assets/scss/main.scss'
import './js/modules/database'

export const store = configureStore({})
export const AppContext = React.createContext({})

const renderComponent = (Component) => {
    root.render(
        <>
            <Provider store={store}>
                <Component />
            </Provider>
        </>,
    )
}

renderComponent(App)
