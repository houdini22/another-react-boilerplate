import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import {
    Row,
    Col,
    Section,
    Button,
    Dropdown,
    Label,
    Badge,
} from '../../../components'
import { FaFileImage as ImageIcon } from 'react-icons/fa'
import { DropdownFormContainer } from './DropdownFormContainer'
import { createPresentationTab as _createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_helpers.scss'

const cx = classNames.bind(styles)

interface DropdownViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface DropdownViewState {
    options: {
        size: string
        color: string
        triggerSize: string
        triggerColor: string
        trigger: string
        component: string
        placement: string
        updateCount: number
        disableOutsideClick: boolean
    }
}

class DropdownView extends React.Component<
    DropdownViewProps,
    DropdownViewState
> {
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
                disableOutsideClick: false,
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
        const { colSize1 = 4, createPresentationTab = _createPresentationTab } =
            this.props
        const { options } = this.state
        const {
            size,
            color,
            triggerColor,
            triggerSize,
            trigger,
            component,
            placement,
            disableOutsideClick,
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
                                    trigger={trigger}
                                    placement={placement}
                                    disableOutsideClick={disableOutsideClick}
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

export { DropdownView }
export default { DropdownView }
