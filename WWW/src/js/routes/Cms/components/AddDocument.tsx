import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'
import { generateUrl } from '../../../helpers/cms'
import { formattedDateTime } from '../../../helpers/date-time'
import { DocumentIcon } from '../../../components/icons'

export class AddDocumentView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ query: { parent_id } }) => (
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
                                                    icon={<DocumentIcon />}
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
                                                            tree_url_is_editable: true,
                                                            tree_publishing_is_editable: true,
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
