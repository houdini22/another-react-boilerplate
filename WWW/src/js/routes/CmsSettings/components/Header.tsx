import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon, SettingsIcon } from '../../../components/icons'
import { Permission } from '../../../../types.d'

interface HeaderProps {
    permission: Permission
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <PageHeader.Container>
                <PageHeader.Title>
                    <SettingsIcon /> CMS Settings
                </PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/cms/settings">CMS Settings</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
