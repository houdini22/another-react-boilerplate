import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/cms-pages'

export class Manager extends React.Component<null, null> {
    state = {
        collection: [],
    }

    componentDidMount() {
        const { setCurrentId, currentId = 1 } = this.props
        setCurrentId(currentId)
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
            currentNodeParents,
            editCategory,
            addCategory,
            addDocument,
            editDocument,
            addLink,
            editLink,
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
            currentNodeParents,
            editCategory,
            addCategory,
            addDocument,
            editDocument,
            addLink,
            editLink,
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
    currentNodeParents: selectors.getCurrentNodeParents(state),
})

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentId: (id) => dispatch(actions.setCurrentId(id)),
        setIsLoading: (val) => dispatch(actions.setIsLoading(val)),
        publish: (id) => dispatch(actions.publish(id)),
        unpublish: (id) => dispatch(actions.unpublish(id)),
        deleteNode: (node) => dispatch(actions.deleteNode(node)),
        addCategory: (values) => dispatch(actions.addCategory(values)),
        editCategory: (values) => dispatch(actions.editCategory(values)),
        addDocument: (values) => dispatch(actions.addDocument(values)),
        editDocument: (values) => dispatch(actions.editDocument(values)),
        addLink: (values) => dispatch(actions.addLink(values)),
        editLink: (values) => dispatch(actions.editLink(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
