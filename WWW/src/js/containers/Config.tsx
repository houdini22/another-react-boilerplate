import * as React from 'react'
import { myGet, myPost } from '../modules/http'
import { LoadingOverlay } from '../components'

interface ManagerProps {}

interface ManagerState {
    config: []
}

const Context = React.createContext({ config: {} })

class Container extends React.Component<ManagerProps, ManagerState> {
    state = {
        config: [],
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

    getByKey(key) {
        return this.state.config.find(({ key: k }) => k === key)
    }

    edit(data) {
        return new Promise((resolve, reject) => {
            myPost('/config/edit', { config: data }).then(
                (edited) => {
                    const { config } = this.state

                    this.setState({
                        config: config
                            .filter(({ key }) => {
                                return !edited.find(({ key: k }) => {
                                    return k === key
                                })
                            })
                            .concat(edited),
                    })

                    resolve()
                },
                () => {
                    reject()
                },
            )
        })
    }

    render() {
        const { children } = this.props
        const { config, isLoading } = this.state

        return (
            <>
                <Context.Provider
                    value={{
                        config,
                        getByKey: this.getByKey.bind(this),
                        edit: this.edit.bind(this),
                    }}
                >
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
