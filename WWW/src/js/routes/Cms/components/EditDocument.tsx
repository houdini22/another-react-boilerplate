import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'

export class EditDocumentView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ query: { id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={id} getMenus>
                                    {({ currentNode, isLoading, setIsLoading, currentNodeParents, editDocument, menus }) => {
                                        return (
                                            <div>
                                                <Header
                                                    canByPermission={canByPermission}
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Edit Document'}
                                                    actionTitle={'Edit Document'}
                                                    action={'edit'}
                                                />

                                                <AddDocumentFormContainer
                                                    currentNode={currentNode}
                                                    initialValues={{
                                                        tree: {
                                                            tree_published_from: currentNode.tree_published_from,
                                                            tree_published_to: currentNode.tree_published_to,
                                                            tree_is_published: currentNode.tree_is_published,
                                                            id: currentNode.id,
                                                            tree_display_name: currentNode.tree_display_name,
                                                            tree_url_is_editable: currentNode.tree_url_is_editable,
                                                            tree_publishing_is_editable: currentNode.tree_publishing_is_editable,
                                                        },
                                                        document: currentNode.document,
                                                        parent_id: currentNode.parent_id,
                                                    }}
                                                    save={editDocument}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                    menus={menus}
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

export default EditDocumentView
