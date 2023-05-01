import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    role: Object
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { role } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Users - edit user</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/roles">Roles</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/roles/edit?id=${role['id']}`}>
                        Users - Edit Role
                    </PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
