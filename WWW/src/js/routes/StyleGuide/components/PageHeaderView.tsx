import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, PageHeader } from '../../../components'
import { PageHeaderFormContainer } from './PageHeaderFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { Button, Dropdown, Label } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_helpers.scss'

const cx = classNames.bind(styles)

interface PageHeaderViewState {
    options: {
        size: string
        breadcrumbs: boolean
        actions: boolean
        updateCount: number
    }
}

class PageHeaderView extends React.Component<any, PageHeaderViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                size: 'md',
                breadcrumbs: false,
                actions: false,
                updateCount: 0,
            },
        }
        this.setOptions = this.setOptions.bind(this)
    }

    setOptions(newOptions) {
        const {
            options: { updateCount },
        } = this.state
        this.setState({
            options: { ...newOptions, updateCount: updateCount + 1 },
        })
    }

    render() {
        const { options } = this.state
        const { size, breadcrumbs, actions } = options

        return (
            <PageContent>
                <ComponentsPageHeader title="PageHeader" component="PageHeader" />
                <div style={{ marginBottom: 30 }}>
                    <Row>
                        <Col xs={12}>
                            <PageHeaderFormContainer options={options} setOptions={this.setOptions} />
                        </Col>
                    </Row>
                </div>
                <PageHeader.Container size={size}>
                    <PageHeader.Title>Title</PageHeader.Title>
                    {breadcrumbs && (
                        <PageHeader.Breadcrumbs>
                            <PageHeader.BreadcrumbsItem href="/">
                                <HomeIcon /> Home
                            </PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem href="/components">Components</PageHeader.BreadcrumbsItem>
                            <PageHeader.BreadcrumbsItem href="/components/page-header">
                                PageHeader
                            </PageHeader.BreadcrumbsItem>
                        </PageHeader.Breadcrumbs>
                    )}
                    {actions && (
                        <PageHeader.Actions>
                            <Button color="info">Some button</Button>
                            <Dropdown.Container placement="right">
                                <Dropdown.Trigger component={Button}>Actions</Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Action 1</Dropdown.Item>
                                    <Dropdown.Item>
                                        Action 2
                                        <Label color="warning" className={cx('pull-right')}>
                                            33
                                        </Label>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        </PageHeader.Actions>
                    )}
                </PageHeader.Container>
            </PageContent>
        )
    }
}

export { PageHeaderView }
export default { PageHeaderView }
