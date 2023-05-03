import * as React from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import { FaAngleDown as ArrowIconDown, FaAngleUp as ArrowIconUp } from 'react-icons/fa'
import styles from '../../../../assets/scss/components/_accordion.scss'

const cx = classNames.bind(styles)

interface AccordionContainerProps {
    children: any
    color?: string
    rounded?: boolean
    size?: string
    separated?: boolean
    type?: string
    closeIcon?: boolean
    outline: boolean
}

interface AccordionStateProps {
    opened: string
    registered: object
}

class Container extends React.Component<AccordionContainerProps, AccordionStateProps> {
    state: AccordionStateProps = { opened: '', registered: {} }

    registerItem({ name }) {
        const { registered } = this.state

        if (!registered[name]) {
            registered[name] = true
            this.setState({ registered })
        }
    }

    isOpened(name) {
        const { opened } = this.state

        return opened === name
    }

    open(name) {
        this.setState({ opened: name })
    }

    close() {
        this.setState({ opened: '' })
    }

    render() {
        const { children, color, rounded, size, separated, type = 'boxed', closeIcon } = this.props

        return (
            <AppContext.Provider
                value={{
                    registerItem: this.registerItem.bind(this),
                    isOpened: this.isOpened.bind(this),
                    open: this.open.bind(this),
                    close: this.close.bind(this),
                    size,
                    type,
                    closeIcon,
                }}
            >
                <div
                    className={cx('component-accordion', {
                        [`component-accordion--color-${color}`]: color,
                        [`component-accordion--size-${size}`]: size,
                        [`component-accordion--rounded`]: rounded,
                        [`component-accordion--separated`]: separated,
                        [`component-accordion--type-${type}`]: type,
                        [`component-accordion--no-close-icon`]: !closeIcon,
                    })}
                >
                    {children}
                </div>
            </AppContext.Provider>
        )
    }
}

interface AccordionItemProps {
    children: any
    name: string
}

class Item extends React.Component<AccordionItemProps, null> {
    render() {
        const { children, name } = this.props

        return (
            <AppContext.Consumer>
                {({ registerItem, isOpened, open, close, size, type, closeIcon }) => {
                    registerItem(name)

                    return (
                        <AppContext.Provider
                            value={{
                                isOpened,
                                name,
                                open,
                                close,
                                size,
                                type,
                                closeIcon,
                            }}
                        >
                            <div className={cx('component-accordion__item')}>{children}</div>
                        </AppContext.Provider>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

class ItemHeader extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return (
            <AppContext.Consumer>
                {({ open, name, isOpened, close, size, type, closeIcon }) => {
                    return (
                        <AppContext.Provider value={{ accordionSize: size }}>
                            <div
                                className={cx('component-accordion__item__header')}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (!isOpened(name)) {
                                        open(name)
                                    } else {
                                        close()
                                    }
                                }}
                            >
                                {type === 'minimal' && isOpened(name) && closeIcon && (
                                    <ArrowIconUp className={cx('component-accordion__item__header__arrow-icon')} />
                                )}
                                {type === 'minimal' && !isOpened(name) && closeIcon && (
                                    <ArrowIconDown className={cx('component-accordion__item__header__arrow-icon')} />
                                )}
                                <div className={cx('component-accordion__item__header__content')}>{children}</div>

                                {type === 'boxed' && isOpened(name) && closeIcon && (
                                    <ArrowIconUp className={cx('component-accordion__item__header__arrow-icon')} />
                                )}
                                {type === 'boxed' && !isOpened(name) && closeIcon && (
                                    <ArrowIconDown className={cx('component-accordion__item__header__arrow-icon')} />
                                )}
                            </div>
                        </AppContext.Provider>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

class ItemContent extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return (
            <AppContext.Consumer>
                {({ isOpened, name }) => {
                    if (isOpened(name)) {
                        return <div className={cx('component-accordion__item__item-content')}>{children}</div>
                    }

                    return null
                }}
            </AppContext.Consumer>
        )
    }
}
export { Container, Item, ItemHeader, ItemContent }
