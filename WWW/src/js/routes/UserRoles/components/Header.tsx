import * as React from 'react'
import { Button, Dropdown, Label, PageHeader, Popover, Table } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, RoleIcon } from '../../../components/icons'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface RolesTableProps {}

export class Header extends React.Component<RolesTableProps> {
    render() {
        const { openAddModal } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Roles</PageHeader.Title>
                <PageHeader.Actions>
                    <Button color={'success'} onClick={() => openAddModal()}>
                        Add Role
                    </Button>
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/roles">Roles</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
