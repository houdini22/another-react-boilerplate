import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
    Row,
    Col,
    Section,
    Button,
    Dropdown,
    Label,
    Badge,
} from '../../../components/index'
import { FaFileImage as ImageIcon } from 'react-icons/fa'
import { DropdownFormContainer } from './DropdownFormContainer'
import PropTypes from 'prop-types'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_helpers.scss'

const cx = classNames.bind(styles)

class DropdownView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                size: 'md',
                color: 'default',
                triggerSize: 'md',
                triggerColor: 'default',
                trigger: 'click',
                component: 'Button',
                placement: 'left',
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
        const { colSize1, createPresentationTab } = this.props
        const { options } = this.state
        const {
            size,
            color,
            triggerColor,
            triggerSize,
            trigger,
            component,
            placement,
        } = options

        const getComponent = () => {
            switch (component) {
                case 'Button':
                    return Button
                case 'Badge':
                    return Badge
                case 'Label':
                    return Label
                default:
                    return null
            }
        }

        const code = ''

        return (
            <PageContent>
                <ComponentsPageHeader title="Dropdown" component="Dropdown" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <DropdownFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>Basic</span>,
                                <Dropdown.Container
                                    size={size}
                                    triggerSize={triggerSize}
                                    triggerColor={triggerColor}
                                    color={color}
                                    disableOutsideClick
                                    trigger={trigger}
                                    placement={placement}
                                >
                                    <Dropdown.Trigger
                                        component={getComponent()}
                                    >
                                        Show
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="header">
                                            Header
                                        </Dropdown.Item>
                                        <Dropdown.Item>Action 1</Dropdown.Item>
                                        <Dropdown.Item>
                                            Action 2
                                            <Badge
                                                color="info"
                                                className={cx('pull-right')}
                                            >
                                                33
                                            </Badge>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            Action 3{' '}
                                            <Label
                                                color="danger"
                                                className={cx('pull-right')}
                                            >
                                                HOT
                                            </Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item type="divider" />
                                        <Dropdown.Item type="disabled">
                                            Disabled
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            type="header"
                                            highlighted
                                        >
                                            Highlighted Header
                                        </Dropdown.Item>
                                        <Dropdown.Item type="header">
                                            <ImageIcon /> Icon Header{' '}
                                            <ImageIcon
                                                className={cx('pull-right')}
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            Submenu
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    Item 1
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    Item 2
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    Item 3
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            SubItem 1
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            SubItem 2
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            SubItem 3
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Container>,
                                code,
                                {
                                    colSize: colSize1,
                                },
                            )}
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

DropdownView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

DropdownView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { DropdownView }
export default { DropdownView }
