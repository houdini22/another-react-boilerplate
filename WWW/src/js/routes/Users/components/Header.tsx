import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface FiltersProps {
    navigate(uri): Function
}

export class Header extends React.Component<FiltersProps, null> {
    render() {
        const { navigate } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Users</PageHeader.Title>
                <PageHeader.Actions>
                    <Button color={'success'} onClick={() => navigate('/users/add')}>
                        Add
                    </Button>
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
