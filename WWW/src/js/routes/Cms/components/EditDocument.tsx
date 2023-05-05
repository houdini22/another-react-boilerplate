import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Pages/Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'
import { generateUrl } from '../../../helpers/cms'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'

export class EditDocumentView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <PageContent>
                        <Manager currentId={id}>
                            {({ currentNode, isLoading, setIsLoading, currentNodeParents, editDocument }) => {
                                return (
                                    <div>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />

                                        <AddDocumentFormContainer
                                            currentNode={currentNode}
                                            initialValues={{
                                                tree: {
                                                    tree_published_from: currentNode.tree_published_from,
                                                    tree_published_to: currentNode.tree_published_to,
                                                    tree_is_published: currentNode.tree_is_published,
                                                    id: currentNode.id,
                                                },
                                                document: currentNode.document,
                                                parent_id: currentNode.parent_id,
                                            }}
                                            save={editDocument}
                                            setIsLoading={setIsLoading}
                                            isLoading={isLoading}
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

export default EditDocumentView
