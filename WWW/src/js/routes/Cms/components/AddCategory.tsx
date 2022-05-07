import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddCategoryFormContainer } from '../containers/AddCategoryFormContainer'

export class AddCategoryView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <Header title="Add Category" />
                        <Manager>
                            {({
                                nodes,
                                currentNode,
                                isLoading,
                                isLoaded,
                                fetchError,
                            }) => {
                                console.log(
                                    nodes,
                                    currentNode,
                                    isLoaded,
                                    isLoading,
                                    fetchError,
                                )
                            }}
                        </Manager>
                        <AddCategoryFormContainer />
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default AddCategoryView
