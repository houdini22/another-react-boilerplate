import * as React from 'react'
import { AppContext } from '../../../../index'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'
import _ from 'lodash'
import jQuery from 'jquery'
import styles from '../../../../assets/scss/components/_popover.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    children: any
    pixelsWidth: number
    outline: boolean
    color: string
    className: string
    placement: string
    noPadding: boolean
    disableOutsideClick: boolean
    transparent: boolean
    trigger: any
    style: object
}

interface ContainerState {
    isOpen: boolean
    contentElement: any
    contentElementRegistered: boolean
    triggerElement: any
    triggerElementRegistered: boolean
    contentElementMarginTop: number
}

class Container extends React.Component<ContainerProps, ContainerState> {
    state = {
        isOpen: false,
        contentElement: document.createElement('div'),
        contentElementRegistered: false,
        triggerElement: document.createElement('div'),
        triggerElementRegistered: false,
        contentElementMarginTop: 0,
    }

    ref = null

    componentDidMount() {
        document.addEventListener(
            'mousedown',
            this.handleClickOutside.bind(this),
        )
    }

    componentDidUpdate() {
        const { placement } = this.props
        if (placement === 'left-center' || placement === 'right-center') {
            const { triggerElement, contentElement, contentElementMarginTop } =
                this.state
            const triggerElementHeight = jQuery(triggerElement).height()
            const contentElementHeight = jQuery(contentElement).height()
            const newMargin = -(
                contentElementHeight / 2 -
                triggerElementHeight / 2
            )
            if (contentElementMarginTop !== newMargin) {
                this.setState({
                    contentElementMarginTop: newMargin,
                })
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener(
            'mousedown',
            this.handleClickOutside.bind(this),
        )
    }

    handleClickOutside(event) {
        const { disableOutsideClick } = this.props

        if (!disableOutsideClick) {
            if (this.ref && !this.ref.contains(event.target)) {
                this.close()
            }
        }
    }

    open() {
        this.setState({ isOpen: true })
    }

    close() {
        this.setState({ isOpen: false })
    }

    registerContentElement(e) {
        const { contentElementRegistered } = this.state
        if (!contentElementRegistered) {
            this.setState({ contentElement: e, contentElementRegistered: true })
        }
    }

    registerTriggerElement(e) {
        const { triggerElementRegistered } = this.state
        if (!triggerElementRegistered) {
            this.setState({ triggerElement: e, triggerElementRegistered: true })
        }
    }

    render() {
        const {
            children,
            pixelsWidth,
            outline,
            color = 'default',
            className,
            placement,
            noPadding,
            trigger,
            transparent,
            style,
        } = this.props
        const { isOpen, contentElement, contentElementMarginTop } = this.state

        return (
            <AppContext.Provider
                value={{
                    open: this.open.bind(this),
                    close: this.close.bind(this),
                    isOpen,
                    contentElement,
                    pixelsWidth,
                    trigger,
                    registerTriggerElement:
                        this.registerTriggerElement.bind(this),
                }}
            >
                <div
                    className={cx('component-popover', {
                        'component-popover--outline': outline,
                        [`component-popover--color-${color}`]: color,
                        [`component-popover--placement-${placement}`]:
                            placement,
                        [`component-popover--is-open`]: isOpen,
                        [`component-popover--no-padding`]: noPadding,
                        [`component-popover--transparent`]: transparent,
                        [className]: className,
                    })}
                    ref={(e) => (this.ref = e)}
                    style={style}
                >
                    {children}
                    <div
                        className={cx('component-popover__content')}
                        style={{
                            width: Number(pixelsWidth),
                            marginTop:
                                placement === 'right-center' ||
                                placement === 'left-center'
                                    ? contentElementMarginTop
                                    : 0,
                        }}
                        ref={(e) => this.registerContentElement(e)}
                    />
                </div>
            </AppContext.Provider>
        )
    }
}

interface TriggerProps {
    children: any
}

class Trigger extends React.Component<TriggerProps> {
    trigger = 'hover'

    contentElement = null

    triggerElement = null

    isOpen = false

    close = () => null

    open = () => null

    constructor(props) {
        super(props)

        this.handleOutsideHover = this.handleOutsideHover.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mouseover', this.handleOutsideHover)
    }

    componentWillUnmount() {
        document.removeEventListener('mouseover', this.handleOutsideHover)
    }

    handleOutsideHover(e) {
        if (this.__reactstandin__isMounted) {
            if (this.trigger === 'hover') {
                if (e.target) {
                    if (
                        !this.contentElement.contains(e.target) &&
                        !this.triggerElement.contains(e.target)
                    ) {
                        if (this.isOpen) {
                            this.close()
                        }
                    } else {
                        if (!this.isOpen) {
                            this.open()
                        }
                    }
                }
            }
        }
    }

    render() {
        const { children } = this.props

        return (
            <AppContext.Consumer>
                {({
                    open,
                    close,
                    isOpen,
                    contentElement,
                    trigger,
                    registerTriggerElement,
                }) => {
                    this.contentElement = contentElement
                    this.trigger = trigger
                    this.close = close
                    this.open = open
                    this.isOpen = isOpen

                    return (
                        <div
                            className={cx('component-popover__trigger')}
                            onClick={() => {
                                if (!_.isFunction(children)) {
                                    if (isOpen) {
                                        close()
                                    } else {
                                        open()
                                    }
                                }
                            }}
                            ref={(e) => {
                                this.triggerElement = e
                                registerTriggerElement(e)
                            }}
                        >
                            {_.isFunction(children) &&
                                children({ open, close, isOpen })}
                            {!_.isFunction(children) && children}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

interface ContentProps {
    children: any
    className: string
}

class Content extends React.Component<ContentProps> {
    render() {
        const { children, className } = this.props

        return (
            <AppContext.Consumer>
                {({ contentElement, close, open, isOpen }) => {
                    return createPortal(
                        <div
                            className={cx('component-popover__content__outer', {
                                [className]: className,
                            })}
                        >
                            <div
                                className={cx(
                                    'component-popover__content__outer__inner',
                                )}
                            >
                                {_.isFunction(children) &&
                                    children({ close, open, isOpen })}
                                {!_.isFunction(children) && children}
                            </div>
                        </div>,
                        contentElement,
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export { Container, Trigger, Content }
export default { Container, Trigger, Content }
