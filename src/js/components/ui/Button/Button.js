import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay/index'
import {
    FaAngleDown as ArrowDownIcon,
    FaArrowRight as ArrowRightIcon,
} from 'react-icons/fa'
import { AppContext } from '../../../../index'
import { Link } from 'react-router-dom'
import styles from '../../../../assets/scss/components/_button.scss'

const cx = classnames.bind(styles)

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: props['color'] || 'primary',
            isLoading: props['isLoading'],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevState['isLoading'] === this.state['isLoading'] &&
            this.props['isLoading'] !== prevProps['isLoading']
        ) {
            this.setState({ isLoading: this.props['isLoading'] })
        }
        if (
            prevState['color'] === this.state['color'] &&
            this.props['color'] !== prevProps['color']
        ) {
            this.setState({ color: this.props['color'] })
        }
    }

    handleClick(event) {
        const { onClick } = this.props

        const navigationElement = ReactDOM.findDOMNode(this.navigationRef)

        if (
            !navigationElement ||
            (navigationElement && !navigationElement.contains(event.target))
        ) {
            if (_.isFunction(onClick)) {
                const controller = {
                    setColor: (color) => this.setState({ color }),
                    setIsLoading: (isLoading) => this.setState({ isLoading }),
                }

                onClick(event, controller)
            }
        }

        return false
    }

    render() {
        return (
            <AppContext.Consumer>
                {({
                    cardSize,
                    buttonGroupSize,
                    buttonGroupColor,
                    buttonGroupOutline,
                    buttonGroupDisabled,
                    buttonGroupBorderless,
                    pageHeaderSize,
                } = {}) => {
                    const {
                        size,
                        children,
                        disabled,
                        block,
                        icon,
                        iconOnly,
                        rounded,
                        outline,
                        roundless,
                        arrow,
                        borderless,
                        className,
                        type,
                        navigationHref,
                        onClickNavigation,
                        transparent,
                        style,
                        ...rest
                    } = this.props

                    const { isLoading, color } = this.state

                    const classes = cx('component-button', className, {
                        'component-button--is-loading': isLoading,
                        'component-button--icon-only': iconOnly,
                        [`component-button--color-${
                            buttonGroupColor || color
                        }`]: buttonGroupColor || color,
                        [`component-button--size-${
                            pageHeaderSize ||
                            cardSize ||
                            buttonGroupSize ||
                            size
                        }`]:
                            pageHeaderSize ||
                            cardSize ||
                            buttonGroupSize ||
                            size,
                        'component-button--block': block,
                        'component-button--disabled':
                            isLoading || buttonGroupDisabled || disabled,
                        'component-button--rounded': rounded,
                        'component-button--outline':
                            buttonGroupOutline || outline,
                        'component-button--roundless': roundless,
                        'component-button--borderless':
                            buttonGroupBorderless || borderless,
                        'component-button--has-navigation': navigationHref,
                        'component-button--transparent': transparent,
                    })

                    const isDisabled =
                        isLoading || buttonGroupDisabled || disabled

                    return (
                        <button
                            {...rest}
                            style={style}
                            className={classes}
                            onClick={this.handleClick.bind(this)}
                            disabled={isDisabled}
                            type={type}
                        >
                            {icon}
                            {!iconOnly && <span>{children}</span>}
                            {isLoading && <LoadingOverlay size="xs" />}
                            {arrow && (
                                <ArrowDownIcon
                                    className={cx(
                                        'component-button__arrow-icon',
                                    )}
                                />
                            )}
                            {navigationHref && (
                                <Link
                                    to={navigationHref}
                                    className={cx(
                                        'component-button__navigation',
                                    )}
                                    ref={(e) => (this.navigationRef = e)}
                                    onClick={(e) => {
                                        onClickNavigation()
                                    }}
                                >
                                    <ArrowRightIcon />
                                </Link>
                            )}
                        </button>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired,
        PropTypes.array.isRequired,
    ]),
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    block: PropTypes.bool,
    icon: PropTypes.element,
    iconOnly: PropTypes.bool,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
    roundless: PropTypes.bool,
    arrow: PropTypes.bool,
    className: PropTypes.string,
    borderless: PropTypes.bool,
    type: PropTypes.string,
    navigationHref: PropTypes.string,
    onClickNavigation: PropTypes.func,
}

Button.defaultProps = {
    color: 'primary',
    type: 'submit',
    size: 'md',
    onClickNavigation: () => null,
}

export { Button }
export default { Button }
