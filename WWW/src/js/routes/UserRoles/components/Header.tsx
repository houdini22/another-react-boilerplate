import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'

interface RolesTableProps {}

export class Header extends React.Component<RolesTableProps> {
    render() {
        const { openModal } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Roles</PageHeader.Title>
                <PageHeader.Actions>
                    <Button color={'success'} onClick={() => openModal('add-role')}>
                        Add
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
