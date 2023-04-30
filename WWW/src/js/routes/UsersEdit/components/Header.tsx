import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    user: Object
    navigate: Function
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { navigate, user } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Users - edit user</PageHeader.Title>
                <PageHeader.Actions>
                    <Button color={'success'} onClick={() => navigate('/users')}>
                        Go Back
                    </Button>
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/users/edit?id=${user['id']}`}>
                        Users - Edit User
                    </PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
