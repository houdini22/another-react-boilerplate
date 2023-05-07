import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'
import { generateUrl } from '../../../helpers/cms'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

export class AddDocumentView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={parent_id}>
                                    {({ setIsLoading, currentNode, isLoading, currentNodeParents, addDocument }) => {
                                        return (
                                            <div>
                                                <Header
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Add Document'}
                                                    actionTitle={'Add Document'}
                                                    action={'add'}
                                                    canByPermission={canByPermission}
                                                />

                                                <AddDocumentFormContainer
                                                    currentNode={currentNode}
                                                    initialValues={{
                                                        tree: {
                                                            tree_published_from: formattedDateTime({
                                                                year: 2000,
                                                                month: 1,
                                                                day: 1,
                                                                hour: 0,
                                                                minute: 0,
                                                                second: 0,
                                                            }),
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
                                                            document_url: generateUrl(currentNode?.category?.category_url) || '/',
                                                        },
                                                    }}
                                                    save={addDocument}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                />
                                            </div>
                                        )
                                    }}
                                </Manager>
                            </PageContent>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default AddDocumentView
