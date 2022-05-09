import * as React from 'react'
import classNames from 'classnames/bind'
import jQuery from 'jquery'
import styles1 from '../../../../assets/scss/components/_tooltip.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

interface TooltipProps {
    children: any
    color?: string
    className?: string
    size?: string
    outline?: boolean
    placement?: string
    tooltip?: any
    trigger?: string
    onOpen?(): any
    onClose?(): any
}

interface TooltipState {
    show: boolean
    left: number
    top: number
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
    static defaultProps = {
        onOpen: () => null,
        onClose: () => null,
        size: 'md',
        placement: 'top',
        trigger: 'hover',
    }

    state = { show: false, left: 0, top: 0 }

    element = null

    tooltip = null

    calculateLeft(placement) {
        const element = this.element
        const tooltip = this.tooltip

        if (element && tooltip) {
            const { left } = jQuery(element).offset()
            const elementWidth = jQuery(element).width()
            const tooltipWidth = jQuery(tooltip).width()

            switch (placement) {
                case 'top-start':
                    return left
                case 'top':
                    return left + elementWidth / 2 - tooltipWidth / 2 - 10
                case 'top-end':
                    return left + (elementWidth - tooltipWidth) - 20
                case 'bottom-start':
                    return left
                case 'bottom':
                    return left + elementWidth / 2 - tooltipWidth / 2 - 10
                case 'bottom-end':
                    return left + (elementWidth - tooltipWidth) - 20
                case 'right-start':
                    return left + 20 + elementWidth
                case 'right':
                    return left + 20 + elementWidth
                case 'right-end':
                    return left + 20 + elementWidth
                case 'left-start':
                    return left - tooltipWidth - 35
                case 'left':
                    return left - tooltipWidth - 35
                case 'left-end':
                    return left - tooltipWidth - 35
            }
            return left
        }
        return 0
    }

    calculateTop(placement) {
        const element = this.element
        const tooltip = this.tooltip

        if (element) {
            const { top } = jQuery(element).offset()
            const elementHeight = jQuery(element).height()
            const tooltipHeight = jQuery(tooltip).height()
            const scrollTop = jQuery(window).scrollTop()

            switch (placement) {
                case 'top-start':
                    return top - 40 + scrollTop
                case 'top':
                    return top - 40 - scrollTop - tooltipHeight
                case 'top-end':
                    return top - 40 + scrollTop
                case 'bottom-start':
                    return top + elementHeight + 10 + scrollTop
                case 'bottom':
                    return top + elementHeight + 10 + scrollTop
                case 'bottom-end':
                    return top + elementHeight + 10 + scrollTop
                case 'right-start':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop -
                        18
                    )
                case 'right':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop -
                        6
                    )
                case 'right-end':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop +
                        6
                    )
                case 'left-start':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop -
                        18
                    )
                case 'left':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop -
                        6
                    )
                case 'left-end':
                    return (
                        top +
                        elementHeight / 2 -
                        tooltipHeight / 2 +
                        scrollTop +
                        6
                    )
            }
        }
        return 0
    }

    calculateDimensions() {
        this.setState({
            left: this.calculateLeft(this.props.placement),
            top: this.calculateTop(this.props.placement),
        })
    }

    showTooltip() {
        const { onOpen } = this.props

        this.setState({ show: true }, () => {
            this.calculateDimensions()
            onOpen()
        })
    }

    hideTooltip() {
        const { onClose } = this.props

        this.setState({ show: false }, () => {
            onClose()
        })
    }

    render() {
        const {
            children,
            color,
            outline,
            size = 'md',
            className,
            tooltip,
            placement = 'top',
            trigger = 'hover',
            onOpen = () => null,
            onClose = () => null,
            ...props
        } = this.props
        const { show, left, top } = this.state

        return (
            <div
                className={cx('component-tooltip', {
                    [className]: className,
                    [`component-tooltip--color-${color}`]: color,
                    [`component-tooltip--outline`]: outline,
                    [`component-tooltip--size-${size}`]: size,
                    [`component-tooltip--size-${placement}`]: placement,
                    [`component-tooltip--is-open`]: show,
                })}
                {...props}
            >
                <div
                    className={cx('component-tooltip__element')}
                    onMouseEnter={() => {
                        if (trigger === 'hover') {
                            this.showTooltip()
                        }
                    }}
                    onMouseLeave={() => {
                        if (trigger === 'hover') {
                            this.hideTooltip()
                        }
                    }}
                    onClick={() => {
                        if (trigger === 'click') {
                            show ? this.hideTooltip() : this.showTooltip()
                        }
                    }}
                    ref={(el) => {
                        this.element = el
                    }}
                >
                    {children}
                </div>
                {show && (
                    <div
                        className={cx('component-tooltip__tooltip')}
                        style={{
                            left,
                            top,
                        }}
                        ref={(el) => (this.tooltip = el)}
                    >
                        {tooltip}
                    </div>
                )}
            </div>
        )
    }
}

export { Tooltip }
export default { Tooltip }
