import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './AddCategory/Header'
import { AddCategoryFormContainer } from '../containers/AddCategoryFormContainer'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'
import { generateUrl } from '../../../helpers/cms'

export class EditCategoryView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <PageContent>
                        <Manager currentId={id}>
                            {({ currentNode, currentNodeParents, editCategory, setIsLoading, isLoading }) => {
                                return (
                                    <>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />
                                        <AddCategoryFormContainer
                                            currentNode={currentNode}
                                            initialValues={{
                                                tree: {
                                                    tree_published_from: currentNode.tree_published_from,
                                                    tree_published_to: currentNode.tree_published_to,
                                                    tree_is_published: currentNode.tree_is_published,
                                                    id: currentNode.id,
                                                },
                                                category: currentNode.category,
                                                parent_id: currentNode.parent_id,
                                            }}
                                            save={editCategory}
                                            setIsLoading={setIsLoading}
                                            isLoading={isLoading}
                                        />
                                    </>
                                )
                            }}
                        </Manager>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default EditCategoryView
