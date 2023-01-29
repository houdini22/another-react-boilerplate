import * as React from 'react'
import classNames from 'classnames/bind'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay'
import styles1 from '../../../../assets/scss/components/_alert.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

const animationDuration = 700

interface AlertProps {
    children: any
    color?: string
    className?: string
    outline?: boolean
    closeIcon?: boolean
    onClickClose?(controller: object): any
    withIcon?: any
    withIconArrow?: boolean
    iconHighlighted?: boolean
    rounded?: boolean
    background?: boolean
    size?: string
    alignCenter?: boolean
}

class Alert extends React.Component<AlertProps> {
    state = {
        animationStarted: false,
        remove: false,
        isLoading: false,
    }

    constructor(props) {
        super(props)

        this.close = this.close.bind(this)
        this.setIsLoading = this.setIsLoading.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps['isLoading'] !== prevState['isLoading']) {
            return {
                checked: Boolean(nextProps['isLoading']),
            }
        }

        return null
    }

    close() {
        this.setIsLoading(false).then(() => {
            this.setState({ animationStarted: true })
            setTimeout(() => {
                this.setState({ remove: true })
            }, animationDuration)
        })
    }

    setIsLoading(isLoading) {
        return new Promise((resolve) => {
            this.setState({ isLoading }, () => resolve(isLoading))
        })
    }

    render() {
        const {
            children,
            color = 'default',
            className,
            outline,
            closeIcon,
            onClickClose,
            withIcon,
            iconHighlighted,
            withIconArrow,
            rounded,
            background,
            size = 'md',
            alignCenter,
            ...props
        } = this.props
        const { animationStarted, remove, isLoading } = this.state

        if (remove) return null

        return (
            <div
                className={cx('component-alert', {
                    [className]: className,
                    [`component-alert--color-${color}`]: color,
                    [`component-alert--outline`]: outline,
                    [`component-alert--close-icon`]: closeIcon,
                    [`component-alert--with-icon`]: withIcon,
                    [`component-alert--with-icon-arrow`]: withIconArrow,
                    [`component-alert--icon-highlighted`]: iconHighlighted,
                    [`component-alert--rounded`]: rounded,
                    [`component-alert--background`]: background,
                    ['animation--fade-out-top']: animationStarted,
                    [`component-alert--size-${size}`]: size,
                    [`component-alert--align-center`]: alignCenter,
                })}
                {...props}
            >
                {withIcon && (
                    <div className={cx('component-alert__icon-container--outer')}>
                        <div className={cx('component-alert__icon-container--inner')}>{withIcon}</div>
                    </div>
                )}
                <div className={cx('component-alert__content')}>{children}</div>
                {closeIcon && (
                    <div
                        className={cx('component-alert__close-icon')}
                        onClick={() => {
                            if (_.isFunction(onClickClose)) {
                                onClickClose({
                                    close: this.close,
                                    setIsLoading: this.setIsLoading,
                                })
                            } else {
                                this.close()
                            }
                        }}
                    >
                        <CloseIcon className={cx('component--alert__close-icon__icon')} />
                    </div>
                )}
                {isLoading && <LoadingOverlay size="xs" />}
            </div>
        )
    }
}

export { Alert }
export default { Alert }
