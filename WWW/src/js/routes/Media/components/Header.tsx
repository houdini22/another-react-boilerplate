import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    openAddModal: () => void
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { openAddModal } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>Media</PageHeader.Title>
                <PageHeader.Actions>
                    <Button
                        color={'success'}
                        onClick={() => {
                            openAddModal()
                        }}
                    >
                        Add
                    </Button>
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/media">Media</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
