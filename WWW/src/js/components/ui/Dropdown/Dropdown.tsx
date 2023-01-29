import * as React from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { FaAngleRight as ArrowRightIcon } from 'react-icons/fa'
import styles from '../../../../assets/scss/components/_dropdown.scss'

const cx = classNames.bind(styles)

interface DropdownContainerProps {
    size?: string
    color?: string
    triggerSize?: string
    triggerColor?: string
    disableOutsideClick?: boolean
    trigger?: string
    placement?: string
    transparent?: boolean
    children: any
}

interface DropdownContainerState {
    isOpen: boolean
    triggerElement: any
    triggerElementRegistered: boolean
    itemsElement: any
    itemsElementRegistered: boolean
}

export class DropdownContainer extends React.Component<DropdownContainerProps, DropdownContainerState> {
    state = {
        isOpen: false,
        triggerElement: document.createElement('div'),
        triggerElementRegistered: false,
        itemsElement: document.createElement('div'),
        itemsElementRegistered: false,
    }

    ref = null

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this))
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this))
    }

    handleClickOutside(event) {
        const { disableOutsideClick = false } = this.props

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

    registerTriggerElement(triggerElement) {
        const { triggerElementRegistered } = this.state
        if (!triggerElementRegistered) {
            this.setState({ triggerElement, triggerElementRegistered: true })
        }
    }

    registerItemsElement(itemsElement) {
        const { itemsElementRegistered } = this.state
        if (!itemsElementRegistered) {
            this.setState({ itemsElement, itemsElementRegistered: true })
        }
    }

    render() {
        const {
            children,
            size = 'md',
            triggerColor,
            color = 'default',
            triggerSize,
            trigger = 'click',
            placement = 'left',
            transparent,
        } = this.props
        const { isOpen, triggerElement, itemsElement } = this.state

        return (
            <AppContext.Consumer>
                {({ pageHeaderSize } = {}) => (
                    <AppContext.Provider
                        value={{
                            dropdownOpen: this.open.bind(this),
                            dropdownClose: this.close.bind(this),
                            triggerElement,
                            itemsElement,
                            color,
                            dropdownSize: size,
                            dropdownTriggerSize: pageHeaderSize || triggerSize,
                            dropdownTriggerColor: triggerColor,
                            dropdownIsOpen: isOpen,
                            dropdownTrigger: trigger,
                            transparent,
                        }}
                    >
                        <div
                            className={cx('component-dropdown', {
                                [`component-dropdown--size-${size}`]: size,
                                [`component-dropdown--color-${color}`]: color,
                                [`component-dropdown--placement-${placement}`]: true,
                                'component-dropdown--transparent': transparent,
                            })}
                            ref={(e) => (this.ref = e)}
                        >
                            <div
                                className={cx('component-dropdown__trigger')}
                                ref={(e) => this.registerTriggerElement(e)}
                            />
                            <div
                                className={cx('component-dropdown__dropdown-menu', {
                                    'component-dropdown__dropdown-menu--is-open': isOpen,
                                })}
                                ref={(e) => this.registerItemsElement(e)}
                            />
                            {children}
                        </div>
                    </AppContext.Provider>
                )}
            </AppContext.Consumer>
        )
    }
}

interface DropdownTriggerProps {
    children?: any
    component?: any
    transparent?: boolean
    componentProps?: object
}

export class DropdownTrigger extends React.Component<DropdownTriggerProps> {
    static defaultProps = {
        componentProps: {},
    }
    dropdownTrigger = 'hover'

    itemsElement = null

    triggerElement = null

    dropdownClose = null

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
            if (this.dropdownTrigger === 'hover') {
                if (e.target) {
                    if (!this.itemsElement.contains(e.target) && !this.triggerElement.contains(e.target)) {
                        this.dropdownClose()
                    }
                }
            }
        }
    }

    render() {
        const {
            component: Component,
            children,
            transparent,
            componentProps: { icon, iconOnly },
        } = this.props

        return (
            <AppContext.Consumer>
                {({
                    triggerElement,
                    itemsElement,
                    dropdownSize,
                    dropdownTriggerSize,
                    dropdownTriggerColor,
                    dropdownIsOpen,
                    dropdownOpen,
                    dropdownClose,
                    dropdownTrigger,
                }) => {
                    this.dropdownTrigger = dropdownTrigger
                    this.itemsElement = itemsElement
                    this.triggerElement = triggerElement
                    this.dropdownClose = dropdownClose

                    return createPortal(
                        <Component
                            arrow
                            size={dropdownTriggerSize}
                            color={dropdownTriggerColor}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()

                                if (dropdownTrigger === 'click') {
                                    if (dropdownIsOpen) {
                                        dropdownClose()
                                    } else {
                                        dropdownOpen()
                                    }
                                }
                            }}
                            onMouseEnter={(e) => {
                                if (dropdownTrigger === 'hover') {
                                    dropdownOpen()
                                }
                            }}
                            transparent={transparent}
                            disableContext
                            icon={icon}
                            iconOnly={iconOnly}
                        >
                            {children}
                        </Component>,
                        triggerElement,
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export class DropdownMenu extends React.Component {
    render() {
        const { children } = this.props

        return (
            <AppContext.Consumer>
                {({ itemsElement, setHasSubmenu }) => {
                    if (_.isFunction(setHasSubmenu)) {
                        setHasSubmenu()
                    }

                    const component = <ul className={cx('component-dropdown__dropdown-menu__items')}>{children}</ul>

                    return createPortal(component, itemsElement)
                }}
            </AppContext.Consumer>
        )
    }
}

interface DropdownItemProps {
    href?: string
    highlighted?: boolean
    type?: string
    onClick?: () => void
    children: any
    color?: string
}

interface DropdownItemState {
    itemsElementRegistered: boolean
    itemsElement: any
    hasSubmenu: boolean
}

export class DropdownItem extends React.Component<DropdownItemProps, DropdownItemState> {
    state = {
        itemsElementRegistered: false,
        itemsElement: document.createElement('div'),
        hasSubmenu: undefined,
    }

    registerItemsElement(e) {
        const { itemsElementRegistered } = this.state
        if (!itemsElementRegistered) {
            this.setState({ itemsElementRegistered: true, itemsElement: e })
        }
    }

    setHasSubmenu() {
        const { hasSubmenu } = this.state
        if (_.isUndefined(hasSubmenu)) {
            this.setState({ hasSubmenu: true })
        }
    }

    render() {
        const { children, type, highlighted, href, onClick, color } = this.props
        const { itemsElement, hasSubmenu } = this.state

        const getComponent = () => {
            if (!_.isEmpty(href)) {
                return (
                    <Link to={href}>
                        <span>{children}</span>
                    </Link>
                )
            }

            return (
                <a>
                    <span>{children}</span>
                </a>
            )
        }

        return (
            <AppContext.Provider
                value={{
                    itemsElement,
                    setHasSubmenu: this.setHasSubmenu.bind(this),
                }}
            >
                <li
                    className={cx('component-dropdown__dropdown-menu__items__item', {
                        [`component-dropdown__dropdown-menu__items__item--type-${type}`]: type,
                        [`component-dropdown__dropdown-menu__items__item--color-${color}`]: color,
                        [`component-dropdown__dropdown-menu__items__item--highlighted`]: highlighted,
                    })}
                    onClick={() => {
                        if (typeof onClick === 'function') {
                            onClick()
                        }
                    }}
                >
                    <div
                        className={cx('component-dropdown__dropdown-menu__items__item__submenu')}
                        ref={(e) => this.registerItemsElement(e)}
                    />
                    {getComponent()}
                    {hasSubmenu && (
                        <ArrowRightIcon
                            className={cx('component-dropdown__dropdown-menu__items__item__sub-menu-icon')}
                        />
                    )}
                </li>
            </AppContext.Provider>
        )
    }
}

export default { DropdownContainer }
