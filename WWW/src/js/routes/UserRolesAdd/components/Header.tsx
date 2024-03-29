import * as React from 'react'
import { PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { RoleIcon } from '../../../components/icons'

interface HeaderProps {}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <PageHeader.Container>
                <PageHeader.Title>
                    <RoleIcon /> Add Role
                </PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/roles">Roles</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/roles/add`}>Add Role</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
