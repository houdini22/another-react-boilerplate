import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon, LogsIcon } from '../../../components/icons'
import { RouteManager } from '../../../containers'

interface HeaderProps {}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <RouteManager>
                {() => (
                    <PageHeader.Container>
                        <PageHeader.Title>
                            <LogsIcon /> Logs
                        </PageHeader.Title>
                        <PageHeader.Breadcrumbs>
                            <PageHeader.BreadcrumbsItem href="/">
                                <HomeIcon /> Home
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem href="/users/logs">Logs</PageHeader.BreadcrumbsItem>
                        </PageHeader.Breadcrumbs>
                    </PageHeader.Container>
                )}
            </RouteManager>
        )
    }
}

export default Header
