import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from '../../Cms/components/Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddMenuFormContainer } from '../containers/AddMenuFormContainer'
import { formattedDateTime } from '../../../helpers/date-time'
import { LinkIcon, MenuIcon } from '../../../components/icons'

export class CmsAddMenuView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={parent_id}>
                                    {({ setIsLoading, isLoading, addMenu, addNewMenuLink, newMenuLinks, removeNewMenuLink, clearNewMenuLinks }) => {
                                        return (
                                            <div>
                                                <Header title={'CMS - Add Menu'} icon={<MenuIcon />} />
                                                <AddMenuFormContainer
                                                    initialValues={{
                                                        tree: {
                                                            tree_display_name: '',
                                                            tree_is_published: true,
                                                        },
                                                    }}
                                                    save={addMenu}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                    addNewMenuLink={addNewMenuLink}
                                                    newMenuLinks={newMenuLinks}
                                                    removeNewMenuLink={removeNewMenuLink}
                                                    clearNewMenuLinks={clearNewMenuLinks}
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

export default CmsAddMenuView
