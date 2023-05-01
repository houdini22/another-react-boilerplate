import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface RolesTableProps {}

export class Header extends React.Component<RolesTableProps> {
    render() {
        const { openAddModal } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Permissions</PageHeader.Title>
                <PageHeader.Actions>
                    <Button color={'success'} onClick={() => openAddModal()}>
                        Add Permission
                    </Button>
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/permissions">Permissions</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
