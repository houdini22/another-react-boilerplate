import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from '../../Cms/components/Manager'
import { RouteManager, AuthorizationManager } from '../../../containers'
import { Header } from './Header'
import { AddMenuFormContainer } from '../containers/AddMenuFormContainer'
import { MenuIcon } from '../../../components/icons'

export class CmsAddMenuView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager menuId={id}>
                                    {({ setIsLoading, menu, isLoading, editMenu, addNewMenuLink, newMenuLinks, removeNewMenuLink, clearNewMenuLinks }) => {
                                       return (
                                            <div>
                                                <Header title={'CMS - Add Menu'} icon={<MenuIcon />} />
                                                <AddMenuFormContainer
                                                    initialValues={{
                                                        tree: menu,
                                                    }}
                                                    save={editMenu}
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
