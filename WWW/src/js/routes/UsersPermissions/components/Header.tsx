import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'
import { AuthorizationManager, RouteManager } from '../../../containers'
import { ButtonAdd } from '../../../components/common/ButtonAdd'

interface HeaderProps {}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageHeader.Container>
                                <PageHeader.Title>Permissions</PageHeader.Title>
                                <PageHeader.Actions>
                                    {canByPermission('permissions.add') && <ButtonAdd href={'/permissions/add'} />}
                                </PageHeader.Actions>
                                <PageHeader.Breadcrumbs>
                                    <PageHeader.BreadcrumbsItem href="/">
                                        <HomeIcon /> Home
                                    </PageHeader.BreadcrumbsItem>
                                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                                    <PageHeader.BreadcrumbsItem href="/permissions">Permissions</PageHeader.BreadcrumbsItem>
                                </PageHeader.Breadcrumbs>
                            </PageHeader.Container>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default Header
