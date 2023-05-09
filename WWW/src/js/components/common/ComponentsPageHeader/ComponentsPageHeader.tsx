import * as React from 'react'
import { PageHeader, Dropdown, Button } from '../../index'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { RouteManager } from '../../../containers'

interface ComponentsPageHeaderProps {
    title: any
    component: string
}

export class ComponentsPageHeader extends React.Component<ComponentsPageHeaderProps> {
    render() {
        const { title, component } = this.props

        return (
            <RouteManager>
                {({ location: { pathname } }) => (
                    <PageHeader.Container>
                        <PageHeader.Title>{title}</PageHeader.Title>
                        <PageHeader.Breadcrumbs>
                            <PageHeader.BreadcrumbsItem href="/">
                                <HomeIcon /> Home
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem>
                                <Dropdown.Container size="sm">
                                    <Dropdown.Trigger component={Button} transparent>
                                        Components
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/components/accordion" highlighted={pathname === '/components/accordion'}>
                                            Accordion
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/alert" highlighted={pathname === '/components/alert'}>
                                            Alert
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/badge" highlighted={pathname === '/components/badge'}>
                                            Badge
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/button" highlighted={pathname === '/components/button'}>
                                            Button
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/button-group" highlighted={pathname === '/components/button-group'}>
                                            ButtonGroup
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/card" highlighted={pathname === '/components/card'}>
                                            Card
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/column" highlighted={pathname === '/components/column'}>
                                            Column
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/dropdown" highlighted={pathname === '/components/dropdown'}>
                                            Dropdown
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/label" highlighted={pathname === '/components/label'}>
                                            Label
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/list" highlighted={pathname === '/components/list'}>
                                            List
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/loading-overlay" highlighted={pathname === '/components/loading-overlay'}>
                                            LoadingOverlay
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/modal" highlighted={pathname === '/components/modal'}>
                                            Modal
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/notifications" highlighted={pathname === '/components/notifications'}>
                                            Notifications
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/page-header" highlighted={pathname === '/components/page-header'}>
                                            PageHeader
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/popover" highlighted={pathname === '/components/popover'}>
                                            Popover
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/progress" highlighted={pathname === '/components/progress'}>
                                            Progress
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/tabs" highlighted={pathname === '/components/tabs'}>
                                            Tabs
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/table" highlighted={pathname === '/components/table'}>
                                            Table
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/tooltip" highlighted={pathname === '/components/tooltip'}>
                                            Tooltip
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/components/typography" highlighted={pathname === '/components/typography'}>
                                            Typography
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Container>
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem>{component}</PageHeader.BreadcrumbsItem>
                        </PageHeader.Breadcrumbs>
                    </PageHeader.Container>
                )}
            </RouteManager>
        )
    }
}
