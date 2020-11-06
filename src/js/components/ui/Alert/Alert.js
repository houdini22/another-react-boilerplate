import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay/index'
import styles1 from '../../../../assets/scss/components/_alert.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

const animationDuration = 700

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animationStarted: false,
            remove: false,
            isLoading: false,
        }

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
            this.setState({ isLoading }, () => resolve())
        })
    }

    render() {
        const {
            children,
            color,
            className,
            outline,
            closeIcon,
            onClickClose,
            withIcon,
            iconHighlighted,
            withIconArrow,
            rounded,
            background,
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
                })}
                {...props}
            >
                {withIcon && (
                    <div
                        className={cx('component-alert__icon-container--outer')}
                    >
                        <div
                            className={cx(
                                'component-alert__icon-container--inner',
                            )}
                        >
                            {withIcon}
                        </div>
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
                        <CloseIcon
                            className={cx('component--alert__close-icon__icon')}
                        />
                    </div>
                )}
                {isLoading && <LoadingOverlay size="xs" />}
            </div>
        )
    }
}

Alert.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    color: PropTypes.string,
    className: PropTypes.string,
    outline: PropTypes.bool,
    closeIcon: PropTypes.bool,
    onClickClose: PropTypes.func,
    withIcon: PropTypes.element,
    withIconArrow: PropTypes.bool,
    iconHighlighted: PropTypes.bool,
    rounded: PropTypes.bool,
    background: PropTypes.bool,
}

Alert.defaultProps = {
    color: 'default',
}

export { Alert }
export default { Alert }
