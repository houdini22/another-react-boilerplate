import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'
import { RouteManager, AuthorizationManager } from '../../../containers'
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
                                <PageHeader.Title>Roles</PageHeader.Title>
                                <PageHeader.Actions>{canByPermission('roles.add') && <ButtonAdd href={'/roles/add'} />}</PageHeader.Actions>
                                <PageHeader.Breadcrumbs>
                                    <PageHeader.BreadcrumbsItem href="/">
                                        <HomeIcon /> Home
                                    </PageHeader.BreadcrumbsItem>
                                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                                    <PageHeader.BreadcrumbsItem href="/roles">Roles</PageHeader.BreadcrumbsItem>
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
