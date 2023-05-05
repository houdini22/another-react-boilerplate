import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'

interface RolesTableProps {
    navigate: Function
}

export class Header extends React.Component<RolesTableProps, null> {
    render() {
        const { navigate, canByPermission } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Permissions</PageHeader.Title>
                <PageHeader.Actions>
                    {canByPermission('permissions.add') && (
                        <Button color={'success'} onClick={() => navigate('/permissions/add')}>
                            Add
                        </Button>
                    )}
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
