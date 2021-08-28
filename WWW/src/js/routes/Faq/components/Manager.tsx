import * as React from 'react'
import { LocalStorage } from '../../../modules/database'

export class Manager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collection: [],
        }
    }

    componentDidMount() {
        const todos = LocalStorage.queryAll('LoginFormContainer')

        this.setState({
            collection: todos,
        })
    }

    addTodo(name, text) {
        return new Promise((resolve) => {
            const { collection } = this.state

            collection.push({
                name,
                text,
            })

            this.setState({ collection }, () => resolve())
        })
    }

    deleteTodo(id) {
        const { collection } = this.state

        const index = collection.findIndex((obj) => obj.id === id)
        collection.splice(index, 1)

        this.setState({ collection })
    }

    render() {
        const { children } = this.props

        const renderProps = {
            todo: this.state.collection,
            addTodo: this.addTodo.bind(this),
            deleteTodo: this.deleteTodo.bind(this),
        }

        return children(renderProps)
    }
}
