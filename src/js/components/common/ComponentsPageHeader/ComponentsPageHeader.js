import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader, Dropdown, Button } from '../../index'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { RouteManager } from '../../../containers/RouteManager'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_page-header.scss'

const cx = classNames.bind(styles)

export class ComponentsPageHeader extends React.Component {
    render() {
        const { title, component } = this.props

        return (
            <RouteManager>
                {({ match: { path } }) => (
                    <PageHeader.Container>
                        <PageHeader.Title>{title}</PageHeader.Title>
                        <PageHeader.Breadcrumbs>
                            <PageHeader.BreadcrumbsItem href="/">
                                <HomeIcon /> Home
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem>
                                <Dropdown.Container size="sm">
                                    <Dropdown.Trigger
                                        component={Button}
                                        transparent
                                    >
                                        Components
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            href="/components/accordion"
                                            highlighted={
                                                path === '/components/accordion'
                                            }
                                        >
                                            Accordion
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/alert"
                                            highlighted={
                                                path === '/components/alert'
                                            }
                                        >
                                            Alert
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/badge"
                                            highlighted={
                                                path === '/components/badge'
                                            }
                                        >
                                            Badge
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/button"
                                            highlighted={
                                                path === '/components/button'
                                            }
                                        >
                                            Button
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/button-group"
                                            highlighted={
                                                path ===
                                                '/components/button-group'
                                            }
                                        >
                                            ButtonGroup
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/card"
                                            highlighted={
                                                path === '/components/card'
                                            }
                                        >
                                            Card
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/col"
                                            highlighted={
                                                path === '/components/column'
                                            }
                                        >
                                            Column
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/dropdown"
                                            highlighted={
                                                path === '/components/dropdown'
                                            }
                                        >
                                            Dropdown
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/label"
                                            highlighted={
                                                path === '/components/label'
                                            }
                                        >
                                            Label
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/list"
                                            highlighted={
                                                path === '/components/list'
                                            }
                                        >
                                            List
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/loading-overlay"
                                            highlighted={
                                                path ===
                                                '/components/loading-overlay'
                                            }
                                        >
                                            LoadingOverlay
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/modal"
                                            highlighted={
                                                path === '/components/modal'
                                            }
                                        >
                                            Modal
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/notifications"
                                            highlighted={
                                                path ===
                                                '/components/notifications'
                                            }
                                        >
                                            Notifications
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/page-header"
                                            highlighted={
                                                path ===
                                                '/components/page-header'
                                            }
                                        >
                                            PageHeader
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/popover"
                                            highlighted={
                                                path === '/components/popover'
                                            }
                                        >
                                            Popover
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/progress"
                                            highlighted={
                                                path === '/components/progress'
                                            }
                                        >
                                            Progress
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/tabs"
                                            highlighted={
                                                path === '/components/tabs'
                                            }
                                        >
                                            Tabs
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/table"
                                            highlighted={
                                                path === '/components/table'
                                            }
                                        >
                                            Table
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="/components/typography"
                                            highlighted={
                                                path ===
                                                '/components/typography'
                                            }
                                        >
                                            Typography
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Container>
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem>
                                {component}
                            </PageHeader.BreadcrumbsItem>
                        </PageHeader.Breadcrumbs>
                    </PageHeader.Container>
                )}
            </RouteManager>
        )
    }
}

ComponentsPageHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.func.isRequired,
    ]),
    component: PropTypes.string,
}
