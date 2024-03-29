import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddCategoryFormContainer } from '../containers/AddCategoryFormContainer'

export class EditCategoryView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={id} getMenus>
                                    {({ currentNode, currentNodeParents, editCategory, setIsLoading, isLoading, menus }) => {
                                        return (
                                            <>
                                                <Header
                                                    canByPermission={canByPermission}
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Edit Category'}
                                                    actionTitle={'Edit Category'}
                                                    action={'edit'}
                                                />
                                                <AddCategoryFormContainer
                                                    currentNode={currentNode}
                                                    initialValues={{
                                                        tree: {
                                                            tree_published_from: currentNode.tree_published_from,
                                                            tree_published_to: currentNode.tree_published_to,
                                                            tree_is_published: currentNode.tree_is_published,
                                                            id: currentNode.id,
                                                            tree_display_name: currentNode.tree_display_name,
                                                        },
                                                        category: currentNode.category,
                                                        parent_id: currentNode.parent_id,
                                                    }}
                                                    save={editCategory}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                    menus={menus}
                                                />
                                            </>
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

export default EditCategoryView
