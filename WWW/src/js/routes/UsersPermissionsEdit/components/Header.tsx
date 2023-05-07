import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'
import { Permission } from '../../../../types.d'

interface HeaderProps {
    permission: Permission
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { permission } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Edit Permission</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/permissions">Permissions</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/permissions/edit?id=${permission['id']}`}>Edit Permission</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
