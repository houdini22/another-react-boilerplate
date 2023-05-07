import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'
import { RouteManager } from '../../../containers/RouteManager'

interface HeaderProps {}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { navigate } = this.props

        return (
            <RouteManager>
                {() => (
                    <PageHeader.Container>
                        <PageHeader.Title>Logs</PageHeader.Title>
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
