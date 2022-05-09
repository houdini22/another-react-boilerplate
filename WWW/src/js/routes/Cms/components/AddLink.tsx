import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddLinkFormContainer } from '../containers/AddLinkFormContainer'

export class AddLinkView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <Header title="Add Link" />
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
                        <AddLinkFormContainer />
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default AddLinkView
