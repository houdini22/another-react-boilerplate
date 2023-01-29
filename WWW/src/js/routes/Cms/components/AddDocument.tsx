import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddDocumentFormContainer } from '../containers/AddDocumentFormContainer'

export class AddCategoryView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <Header title="Add Document" />
                        <Manager>
                            {({ nodes, currentNode, isLoading, isLoaded, fetchError }) => {
                                console.log(nodes, currentNode, isLoaded, isLoading, fetchError)
                            }}
                        </Manager>
                        <AddDocumentFormContainer />
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default AddCategoryView
