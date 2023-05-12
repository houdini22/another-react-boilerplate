import * as React from 'react'
import { Dropdown, PageHeader, Button } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { AuthorizationManager } from '../../../containers'
import { MenuIcon, PagesIcon } from '../../../components/icons'
import { ButtonAdd } from '../../../components/common/ButtonAdd'

interface HeaderProps {
    title: string
    icon?: any
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { title, icon } = this.props
        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <PageHeader.Container>
                        <PageHeader.Title>
                            {icon} {title}
                        </PageHeader.Title>
                        <PageHeader.Actions>
                            <ButtonAdd href={'/cms/menus/add'} />
                        </PageHeader.Actions>
                        <PageHeader.Breadcrumbs>
                            <PageHeader.BreadcrumbsItem href="/">
                                <HomeIcon /> Home
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem href="/cms/menus">
                                <MenuIcon /> Menus
                            </PageHeader.BreadcrumbsItem>
                        </PageHeader.Breadcrumbs>
                    </PageHeader.Container>
                )}
            </AuthorizationManager>
        )
    }
}

export default Header
