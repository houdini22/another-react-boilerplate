import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames/bind'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay'
import {
    FaAngleDown as ArrowDownIcon,
    FaArrowRight as ArrowRightIcon,
} from 'react-icons/fa'
import { AppContext } from '../../../../index'
import { Link } from 'react-router-dom'
import styles from '../../../../assets/scss/components/_button.scss'

const cx = classnames.bind(styles)

interface ButtonProps {
    children?: any
    isLoading?: boolean
    onClick?(event: any, controller: object): any
    size?: string
    disabled?: boolean
    color?: string
    block?: boolean
    icon?: any
    iconOnly?: boolean
    rounded?: boolean
    outline?: boolean
    roundless?: boolean
    arrow?: boolean
    className?: string
    borderless?: boolean
    type?: 'button' | 'submit' | 'reset'
    navigationHref?: string
    onClickNavigation?(): any
    transparent?: boolean
    style?: object
}

interface ButtonState {
    color: string
    isLoading: boolean
}

class Button extends React.Component<ButtonProps, ButtonState> {
    state = {
        color: 'primary',
        isLoading: false,
    }

    navigationRef = null

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
                        size = 'md',
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
                        type = 'submit',
                        navigationHref,
                        onClickNavigation = () => null,
                        transparent,
                        style,
                        isLoading,
                        href,
                        ...rest
                    } = this.props

                    const { isLoading: isLoadingState, color = 'primary' } = this.state

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
                        (isLoading || isLoadingState) || buttonGroupDisabled || disabled

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
                            {(isLoading || isLoadingState) && <LoadingOverlay size="xs" />}
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

export default { Button }
export { Button }
