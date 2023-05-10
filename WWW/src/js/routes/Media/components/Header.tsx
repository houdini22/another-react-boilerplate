import * as React from 'react'
import { PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { ButtonAdd } from '../../../components/common/ButtonAdd'
import { FileIcon } from '../../../components/icons'

interface HeaderProps {
    openAddModal: () => void
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { openAddModal } = this.props

        return (
            <PageHeader.Container>
                <PageHeader.Title>
                    <FileIcon /> Media
                </PageHeader.Title>
                <PageHeader.Actions>
                    <ButtonAdd
                        onClick={() => {
                            openAddModal()
                        }}
                    ></ButtonAdd>
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
