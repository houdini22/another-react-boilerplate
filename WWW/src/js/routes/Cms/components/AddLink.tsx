import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddLinkFormContainer } from '../containers/AddLinkFormContainer'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

export class AddLinkView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={parent_id}>
                                    {({ setIsLoading, currentNode, isLoading, currentNodeParents, addLink }) => {
                                        return (
                                            <div>
                                                <Header
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Add Link'}
                                                    actionTitle={'Add Link'}
                                                    action={'add'}
                                                    canByPermission={canByPermission}
                                                />
                                                <AddLinkFormContainer
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
                                                        link: {
                                                            link_target: '_self',
                                                        },
                                                    }}
                                                    save={addLink}
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

export default AddLinkView
