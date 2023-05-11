import * as React from 'react'
import { myGet } from '../modules/http'
import { LoadingOverlay } from '../components'

interface ManagerProps {}
interface ManagerState {
    config: Object
}

const Context = React.createContext({ config: {} })

class Container extends React.Component<ManagerProps, ManagerState> {
    state = {
        config: {},
        isLoading: false,
    }
    componentDidMount() {
        this.setState(
            {
                isLoading: true,
            },
            () => {
                myGet('/config/get').then((config) => {
                    this.setState({ config, isLoading: false })
                })
            },
        )
    }

    render() {
        const { children } = this.props
        const { config, isLoading } = this.state

        console.log(config)

        return (
            <>
                <Context.Provider value={{ config }}>
                    {children}
                    {isLoading && <LoadingOverlay />}
                </Context.Provider>
            </>
        )
    }
}

class Manager extends React.Component<ManagerProps, ManagerState> {
    render() {
        const { children } = this.props

        return (
            <>
                <Context.Consumer>{(props) => <>{children(props)}</>}</Context.Consumer>
            </>
        )
    }
}

export { Container, Manager }
