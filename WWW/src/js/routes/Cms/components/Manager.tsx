import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/cms-pages'

export class Manager extends React.Component<null, null> {
    state = {
        collection: [],
    }

    componentDidMount() {
        const {
            defaultFilters = {},
            urlFilters = {},
            setCurrentId,
            setFilters,
            setDefaultFilters,
            fetch,
            setIsLoading,
            id = 1,
        } = this.props
        const newFilters = {
            ...defaultFilters,
            ...urlFilters,
        }
        setDefaultFilters(defaultFilters)

        Promise.all([setCurrentId(id), setFilters(newFilters)]).then(() => {
            setIsLoading(true)
            fetch().then(() => setIsLoading(false))
        })
    }

    render() {
        const {
            children,
            nodes,
            isLoading,
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
            fetch,
            setFilter,
            setFilters,
            resetFilters,
            setDefaultFilters,
            filters,
        } = this.props

        const renderProps = {
            nodes,
            isLoading,
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
            fetch,
            filters,
            setFilter,
            setFilters,
            resetFilters,
            setDefaultFilters,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    isLoading: selectors.getIsLoading(state),
    nodes: selectors.getNodes(state),
    currentNode: selectors.getCurrentNode(state),
    currentNodeParents: selectors.getCurrentNodeParents(state),
    currentId: selectors.getCurrentId(state),
    filters: selectors.getFilters(state),
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
        setFilter: (name, value) => dispatch(actions.setFilter(name, value)),
        setFilters: (values) => dispatch(actions.setFilters(values)),
        resetFilters: () => dispatch(actions.resetFilters()),
        setDefaultFilters: (values) => dispatch(actions.setDefaultFilters(values)),
        fetch: () => dispatch(actions.fetch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
