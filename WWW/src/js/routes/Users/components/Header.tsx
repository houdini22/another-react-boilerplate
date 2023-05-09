import * as React from 'react'
import { PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
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
                                <PageHeader.Title>Users</PageHeader.Title>
                                <PageHeader.Actions>{canByPermission('users.add') && <ButtonAdd href={'/users/add'} />}</PageHeader.Actions>
                                <PageHeader.Breadcrumbs>
                                    <PageHeader.BreadcrumbsItem href="/">
                                        <HomeIcon /> Home
                                    </PageHeader.BreadcrumbsItem>
                                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
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
