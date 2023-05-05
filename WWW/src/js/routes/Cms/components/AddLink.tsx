import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './AddLink/Header'
import { AddLinkFormContainer } from '../containers/AddLinkFormContainer'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'

export class AddLinkView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <PageContent>
                        <Manager currentId={parent_id}>
                            {({ nodes, currentNode, isLoading, isLoaded, fetchError, currentNodeParents }) => {
                                console.log(nodes, currentNode, isLoaded, isLoading, fetchError)

                                return (
                                    <div>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />

                                        <AddLinkFormContainer
                                            currentNode={currentNode}
                                            initialValues={{
                                                tree: {
                                                    tree_published_from: formattedCurrentDate(),
                                                    tree_published_to: formattedDateTime({
                                                        year: 2099,
                                                        month: 1,
                                                        day: 1,
                                                        hour: 0,
                                                        minute: 0,
                                                        second: 0,
                                                    }),
                                                    tree_is_published: true,
                                                },
                                                parent_id: currentNode.id,
                                                link: {
                                                    link_target: '_self',
                                                },
                                            }}
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

export default AddLinkView
