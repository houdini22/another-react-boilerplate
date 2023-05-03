import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/cms-pages'

export class Manager extends React.Component<null, null> {
    state = {
        collection: [],
    }

    componentDidMount() {
        const { setCurrentId } = this.props
        setCurrentId(1)
    }

    render() {
        const {
            children,
            nodes,
            isLoading,
            isLoaded,
            fetchError,
            currentNode,
            setCurrentId,
            setIsLoading,
            publish,
            unpublish,
            deleteNode,
        } = this.props

        const renderProps = {
            nodes,
            isLoading,
            isLoaded,
            fetchError,
            currentNode,
            setCurrentId,
            setIsLoading,
            publish,
            unpublish,
            deleteNode,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    isLoading: selectors.getIsLoading(state),
    isLoaded: selectors.getIsLoaded(state),
    fetchError: selectors.getFetchError(state),
    nodes: selectors.getNodes(state),
    currentNode: selectors.getCurrentNode(state),
})

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentId: (id) => dispatch(actions.setCurrentId(id)),
        setIsLoading: (val) => dispatch(actions.setIsLoading(val)),
        publish: (id) => dispatch(actions.publish(id)),
        unpublish: (id) => dispatch(actions.unpublish(id)),
        deleteNode: (node) => dispatch(actions.deleteNode(node)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
