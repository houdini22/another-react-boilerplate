import * as React from 'react'
import { myGet } from '../modules/http'

interface ManagerProps {}
interface ManagerState {
    config: Object
}

const Context = React.createContext({ config: {} })

class Container extends React.Component<ManagerProps, ManagerState> {
    state = {
        config: {},
    }
    componentDidMount() {
        myGet('/config/get').then((config) => {
            this.setState({ config })
        })
    }

    render() {
        const { children } = this.props
        const { config } = this.state

        console.log(config)

        return (
            <>
                <Context.Provider value={{ config }}>{children}</Context.Provider>
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
