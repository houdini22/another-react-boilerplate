import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { RouteManager } from '../../../containers/RouteManager/index'
import { Button, Popover, Tabs } from '../../../components'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/common'
import { bindActionCreators } from 'redux'
import classNames from 'classnames/bind'
import {
    FaQuestionCircle as FaqIcon,
    FaList as ComponentsIcon,
} from 'react-icons/fa'
import { IoIosMail as ContactIcon } from 'react-icons/io'
import { ContactFormContainer } from '../../../components/common/ContactForm/ContactFormContainer'
import {
    AlertView,
    BadgeView,
    ButtonGroupView,
    ButtonView,
    CardView,
    DropdownView,
    LabelView,
    LoadingOverlayView,
    ModalView,
    PageHeaderView,
    TabsView,
} from '../../StyleGuide'
import { createSimplePresentation } from '../../../utils/tabs'
import config from '../../../config'
import styles1 from '../../../../assets/scss/_pages.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

class IndexViewBase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false,
            renderAction1: false,
            renderAction2: false,
            renderAction3: false,
        }
    }

    componentDidMount() {
        const { setLayoutOption } = this.props

        this.timeout = setTimeout(() => {
            this.setState({ render: true })
        }, 500)

        setLayoutOption('disableHeader', true)
        setLayoutOption('disableFooter', true)
        setLayoutOption('disableSidebar', true)
    }

    componentWillReceiveProps({ layout: { disableHeader } }) {
        if (this.props['layout']['disableHeader'] && !disableHeader) {
            setTimeout(() => {
                this.setState({ renderAction1: true })
            }, 1000)
            setTimeout(() => {
                this.setState({ renderAction2: true })
            }, 1500)
            setTimeout(() => {
                this.setState({ renderAction3: true })
            }, 2500)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const {
            setLayoutOption,
            layout: { disableHeader, disableFooter },
        } = this.props
        const {
            render,
            renderAction1,
            renderAction2,
            renderAction3,
        } = this.state

        return (
            <RouteManager>
                {({ history: { push } }) => (
                    <PageContent
                        className={cx('route--index', {
                            'route--index--active':
                                !disableHeader && !disableFooter,
                        })}
                    >
                        <div className={cx('route--index__container')}>
                            {render && [
                                <span className={cx('animation--fade-in')}>
                                    <strong>
                                        {config.texts.frameworkName}
                                    </strong>{' '}
                                    framework
                                    {disableHeader && disableFooter && (
                                        <StartButton
                                            setLayoutOption={setLayoutOption}
                                        />
                                    )}
                                </span>,
                                <div
                                    className={cx(
                                        'route--index__container__actions',
                                    )}
                                >
                                    {renderAction1 && (
                                        <WhatsNewButton push={push} />
                                    )}
                                    {renderAction2 && <ContactMeButton />}
                                    {renderAction3 && (
                                        <ComponentsButton
                                            setLayoutOption={setLayoutOption}
                                        />
                                    )}
                                </div>,
                            ]}
                        </div>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

const StartButton = ({ setLayoutOption }) => (
    <Button
        color="secondary"
        outline
        onClick={() => {
            setLayoutOption('disableHeader', false)
            setLayoutOption('disableFooter', false)
        }}
        className={cx('animation--heartbeat')}
        size="md"
    >
        START
    </Button>
)

const WhatsNewButton = ({ push }) => (
    <Button
        icon={<FaqIcon />}
        outline
        rounded
        size="md"
        className={cx(
            'route--index__container__actions__action',
            'animation--bounce-in-top',
        )}
        onClick={() => {
            push('/whats-new')
        }}
        color="secondary"
    >
        What's new?
    </Button>
)

const ContactMeButton = () => (
    <Popover.Container
        placement="right-top"
        outline
        className={cx('contact-popover')}
        color="secondary"
    >
        <Popover.Trigger>
            <Button
                icon={<ContactIcon />}
                outline
                rounded
                size="md"
                className={cx(
                    'route--index__container__actions__action',
                    'animation--bounce-in-top',
                )}
                onClick={() => {}}
                color="secondary"
            >
                Contact me
            </Button>
        </Popover.Trigger>
        <Popover.Content className={cx('animation--swing-in-top-fwd')}>
            {({ close }) => (
                <ContactFormContainer type="popover" close={close} />
            )}
        </Popover.Content>
    </Popover.Container>
)

const ComponentsButton = ({ setLayoutOption }) => (
    <Popover.Container placement="right-top" transparent noPadding>
        <Popover.Trigger>
            {({ close, open, isOpen }) => (
                <Button
                    icon={<ComponentsIcon />}
                    outline
                    rounded
                    size="md"
                    className={cx(
                        'route--index__container__actions__action',
                        'animation--bounce-in-top',
                    )}
                    navigationHref="components"
                    onClickNavigation={() => {
                        if (isOpen) {
                            close()
                        } else {
                            open()
                        }
                    }}
                    onClick={() => {
                        setLayoutOption('disableSidebar', false)
                    }}
                    color="secondary"
                >
                    Components
                </Button>
            )}
        </Popover.Trigger>
        <Popover.Content className={cx('animation--swing-in-top-fwd')}>
            {({ close }) => <ComponentsTabs />}
        </Popover.Content>
    </Popover.Container>
)

const ComponentsTabs = () => {
    return (
        <Tabs.Container
            block
            left
            outline
            color="secondary"
            size="sm"
            rounded
            aligned
            animation={cx('animation--swing-in-top-fwd')}
            contentHeight={596}
        >
            <Tabs.Tab name="Alert">
                <Tabs.Trigger>Alert</Tabs.Trigger>
                <Tabs.Content>
                    <AlertView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Badge">
                <Tabs.Trigger>Badge</Tabs.Trigger>
                <Tabs.Content>
                    <BadgeView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Button">
                <Tabs.Trigger>Button</Tabs.Trigger>
                <Tabs.Content>
                    <ButtonView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="ButtonGroup">
                <Tabs.Trigger>ButtonGroup</Tabs.Trigger>
                <Tabs.Content>
                    <ButtonGroupView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Card">
                <Tabs.Trigger>Card</Tabs.Trigger>
                <Tabs.Content>
                    <CardView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Dropdown">
                <Tabs.Trigger>Dropdown</Tabs.Trigger>
                <Tabs.Content>
                    <DropdownView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Label">
                <Tabs.Trigger>Label</Tabs.Trigger>
                <Tabs.Content>
                    <LabelView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="LoadingOverlay">
                <Tabs.Trigger>LoadingOverlay</Tabs.Trigger>
                <Tabs.Content>
                    <LoadingOverlayView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Modal">
                <Tabs.Trigger>NewModal</Tabs.Trigger>
                <Tabs.Content>
                    <ModalView
                        colSize1={12}
                        colSize2={12}
                        createPresentationTab={createSimplePresentation}
                    />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="PageHeader">
                <Tabs.Trigger>PageHeader</Tabs.Trigger>
                <Tabs.Content>
                    <PageHeaderView colSize1={12} colSize2={12} />
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab name="Tabs">
                <Tabs.Trigger>Tabs</Tabs.Trigger>
                <Tabs.Content>
                    <TabsView colSize1={12} colSize2={12} />
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Container>
    )
}

const IndexView = connect(
    (state) => {
        return {
            layout: selectors.getLayout(state),
        }
    },
    (dispatch) => {
        return bindActionCreators(
            {
                setLayoutOption: actions.setLayoutOption,
            },
            dispatch,
        )
    },
)(IndexViewBase)

export default IndexView
export { IndexView }
