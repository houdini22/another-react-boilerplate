import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Pages/Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'
import { generateUrl } from '../../../helpers/cms'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'

export class AddDocumentView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <PageContent>
                        <Manager currentId={parent_id}>
                            {({ nodes, currentNode, isLoading, isLoaded, currentNodeParents, addDocument }) => {
                                return (
                                    <div>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />

                                        <AddDocumentFormContainer
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
                                                document: {
                                                    document_url:
                                                        generateUrl(currentNode?.category?.category_url) || '/',
                                                },
                                            }}
                                            save={addDocument}
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

export default AddDocumentView
