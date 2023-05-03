import * as React from 'react'
import { PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    permission: Object
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <PageHeader.Container>
                <PageHeader.Title>Add Permission</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/permissions">Permissions</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/permissions/add`}>Add Permission</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
