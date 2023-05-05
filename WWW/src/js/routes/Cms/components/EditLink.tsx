import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './EditLink/Header'
import { AddLinkFormContainer } from '../containers/AddLinkFormContainer'

export class EditLinkView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <PageContent>
                        <Manager currentId={id}>
                            {({
                                nodes,
                                currentNode,
                                isLoading,
                                isLoaded,
                                fetchError,
                                currentNodeParents,
                                editLink,
                            }) => {
                                return (
                                    <div>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />

                                        <AddLinkFormContainer
                                            currentNode={currentNode}
                                            initialValues={{
                                                tree: {
                                                    tree_published_from: currentNode.tree_published_from,
                                                    tree_published_to: currentNode.tree_published_to,
                                                    tree_is_published: currentNode.tree_is_published,
                                                    id: currentNode.id,
                                                },
                                                link: currentNode.link,
                                                parent_id: currentNode.parent_id,
                                            }}
                                            save={editLink}
                                        />
                                    </div>
                                )
                            }}
                        </Manager>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default EditLinkView
