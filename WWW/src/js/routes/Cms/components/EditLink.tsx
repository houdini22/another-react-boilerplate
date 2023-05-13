import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddLinkFormContainer } from '../containers/AddLinkFormContainer'

export class EditLinkView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={id}>
                                    {({ setIsLoading, currentNode, isLoading, currentNodeParents, editLink }) => {
                                        return (
                                            <div>
                                                <Header
                                                    canByPermission={canByPermission}
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Edit Link'}
                                                    actionTitle={'Edit Link'}
                                                    action={'edit'}
                                                />

                                                <AddLinkFormContainer
                                                    currentNode={currentNode}
                                                    initialValues={{
                                                        tree: {
                                                            tree_published_from: currentNode.tree_published_from,
                                                            tree_published_to: currentNode.tree_published_to,
                                                            tree_is_published: currentNode.tree_is_published,
                                                            id: currentNode.id,
                                                            tree_display_name: currentNode.tree_display_name,
                                                        },
                                                        link: currentNode.link,
                                                        parent_id: currentNode.parent_id,
                                                        target:
                                                            currentNode.link?.document_id > 0
                                                                ? 'document'
                                                                : currentNode.link?.category_id > 0
                                                                ? 'category'
                                                                : currentNode.link?.file_id > 0
                                                                ? 'file'
                                                                : 'manually',
                                                    }}
                                                    save={editLink}
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

export default EditLinkView
