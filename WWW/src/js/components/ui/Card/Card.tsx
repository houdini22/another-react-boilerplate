import * as React from 'react'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { FiMinimize2 as MinimizeIcon, FiMaximize2 as MaximizeIcon } from 'react-icons/fi'
import { Button } from '../Button'
import { AppContext } from '../../../../index'
import { LoadingOverlay } from '../LoadingOverlay'
import styles from '../../../../assets/scss/components/_card.scss'
import { LocalStorage } from '../../../modules/database'

const cx = classNames.bind(styles)

interface CardProps {
    children: any
    headerActions?: any
    header?: any
    color?: string
    withCloseIcon?: boolean
    onClickClose?(params): any
    className?: string
    withMinimizeIcon?: boolean
    size?: string
    isLoading?: boolean
    noBorderTop?: boolean
    footer?: any
    footerType?: string
    style?: object
    solidBackground?: boolean
    name?: string
}

class Card extends React.Component<CardProps, null> {
    state = {
        closed: false,
        minimized: false,
    }

    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
        this.maximize = this.maximize.bind(this)
    }

    componentDidMount() {
        const { name } = this.props

        if (name) {
            const save = LocalStorage.queryAll('CardMinimize', {
                query: { name },
            })[0]
            if (save) {
                this.setState({ minimized: save.minimized })
            }
        }
    }

    close() {
        this.setState({ closed: true })
    }

    maximize() {
        const { name } = this.props

        this.setState({ minimized: false })

        if (name) {
            LocalStorage.insertOrUpdate('CardMinimize', { name }, { name, minimized: false })
            LocalStorage.commit()
        }
    }

    minimize() {
        const { name } = this.props

        this.setState({ minimized: true })

        if (name) {
            LocalStorage.insertOrUpdate('CardMinimize', { name }, { name, minimized: true })
            LocalStorage.commit()
        }
    }

    renderButton(props = {}) {
        const { size } = this.props

        return <Button {...props} size={size} />
    }

    render() {
        const {
            children,
            header,
            headerActions,
            color,
            withCloseIcon,
            onClickClose,
            className,
            withMinimizeIcon,
            size = 'md',
            isLoading,
            noBorderTop,
            footer,
            footerType,
            style,
            solidBackground,
        } = this.props
        const { closed, minimized } = this.state

        if (closed) {
            return null
        }

        return (
            <div
                className={cx('component-card', {
                    [`component-card--color-${color}`]: color,
                    [`component-card--with-close-icon`]: withCloseIcon,
                    [`component-card--size-${size}`]: size,
                    [`component-card--no-border-top`]: noBorderTop,
                    [`component-card--solid-background`]: solidBackground,
                    [className]: true,
                })}
                style={style}
            >
                {header && (
                    <AppContext.Provider
                        value={{
                            cardSize: size,
                        }}
                    >
                        <div className={cx('component-card__header')}>
                            {_.isFunction(header) && header()}
                            {!_.isFunction(header) && header}
                            <div className={cx('component-card__header__actions')}>
                                {_.isFunction(headerActions) &&
                                    headerActions({
                                        maximize: this.maximize,
                                    })}
                                {!_.isFunction(headerActions) && !_.isEmpty(headerActions) && headerActions}
                                {withMinimizeIcon &&
                                    this.renderButton({
                                        href: '#',
                                        onClick: (e) => {
                                            e.preventDefault()
                                            if (minimized) {
                                                this.maximize()
                                            } else {
                                                this.minimize()
                                            }
                                        },
                                        iconOnly: true,
                                        outline: true,
                                        roundless: true,
                                        borderless: true,
                                        icon: minimized ? <MaximizeIcon /> : <MinimizeIcon />,
                                        color,
                                        className: 'component-card__header__actions__action-button',
                                        size,
                                    })}
                                {withCloseIcon &&
                                    this.renderButton({
                                        href: '#',
                                        onClick: (e) => {
                                            e.preventDefault()
                                            if (_.isFunction(onClickClose)) {
                                                onClickClose({
                                                    close: this.close,
                                                })
                                            } else {
                                                this.close()
                                            }
                                        },
                                        iconOnly: true,
                                        outline: true,
                                        roundless: true,
                                        borderless: true,
                                        icon: <CloseIcon />,
                                        color,
                                        className: 'component-card__header__actions__action-button',
                                        size,
                                    })}
                            </div>
                        </div>
                    </AppContext.Provider>
                )}
                {!minimized && [
                    <div className={cx('component-card__content')}>
                        {_.isFunction(children) && children()}
                        {!_.isFunction(children) && children}
                    </div>,
                    <div
                        className={cx('component-card__footer', {
                            [`component-card__footer--type-${footerType}`]: footerType,
                        })}
                    >
                        {_.isFunction(footer) && footer()}
                        {!_.isFunction(footer) && footer}
                    </div>,
                ]}
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export { Card }
export default { Card }
