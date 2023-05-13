import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/cms-pages'
import { ifDeepDiff } from '../../../utils/javascript'

export class Manager extends React.Component<null, null> {
    state = {
        collection: [],
    }

    componentDidMount() {
        const { filters, setCurrentId, fetch, setIsLoading, id = 1, getMenus, fetchMenus } = this.props

        const promises = []

        if (id) {
            promises.push(setCurrentId(id))
            promises.push(fetch(filters))
        }
        if (getMenus) {
            promises.push(fetchMenus())
        }

        setIsLoading(true).then(() => {
            Promise.all(promises).then(() => {
                setIsLoading(false)
            })
        })
    }

    componentDidUpdate(prevProps: Readonly<null>, prevState: Readonly<null>, snapshot?: any) {
        const { filters, fetch, setIsLoading } = this.props

        if (ifDeepDiff(prevProps.filters, filters)) {
            setIsLoading(true).then(() => {
                fetch(filters).then(
                    () => {
                        setIsLoading(false)
                    },
                    () => setIsLoading(false),
                )
            })
        }
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
            menus,
            addNewMenuLink,
            newMenuLinks,
            removeNewMenuLink,
            addMenu,
            fetchMenus,
            clearNewMenuLinks,
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
            menus,
            addNewMenuLink,
            newMenuLinks,
            removeNewMenuLink,
            addMenu,
            fetchMenus,
            clearNewMenuLinks,
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
    menus: selectors.getMenus(state),
    newMenuLinks: selectors.getNewMenuLinks(state),
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
        addNewMenuLink: (values) => dispatch(actions.addNewMenuLink(values)),
        editLink: (values) => dispatch(actions.editLink(values)),
        fetch: (filters) => dispatch(actions.fetch(filters)),
        fetchMenus: (filters) => dispatch(actions.fetchMenus(filters)),
        removeNewMenuLink: (link) => dispatch(actions.removeNewMenuLink(link)),
        addMenu: (menu, links) => dispatch(actions.addMenu(menu, links)),
        clearNewMenuLinks: () => dispatch(actions.clearNewMenuLinks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
