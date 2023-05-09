import * as React from 'react'
import { PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { Role } from '../../../../types.d'

interface HeaderProps {
    role: Role
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { role } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Edit Role</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/roles">Roles</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/roles/edit?id=${role['id']}`}>Edit Role</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
