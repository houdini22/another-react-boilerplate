import * as React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FaAngleDown as ArrowIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_label.scss'

const cx = classNames.bind(styles)

interface LabelProps {
    children: any
    color: string
    className: string
    rounded: boolean
    roundless: boolean
    block: boolean
    href: string
    iconOnly: boolean
    striped: boolean
    outline: boolean
    arrow: boolean
    size: string
    disableContext: boolean
}

class Label extends React.Component<LabelProps> {
    renderClassName({ cardSize, dropdownSize, accordionSize } = {}) {
        const {
            color = 'default',
            className,
            rounded,
            roundless,
            block,
            href,
            iconOnly,
            striped,
            outline,
            arrow,
            size,
        } = this.props

        return cx('component-label', {
            [className]: className,
            [`component-label--color-${color}`]: color,
            [`component-label--rounded`]: rounded,
            [`component-label--roundless`]: roundless,
            [`component-label--block`]: block,
            [`component-label--link`]: href,
            [`component-label--icon-only`]: iconOnly,
            [`component-label--striped`]: striped,
            [`component-label--outline`]: outline,
            [`component-label--arrow`]: arrow,
            [`component-label--size-${
                dropdownSize || cardSize || accordionSize || size
            }`]: dropdownSize || cardSize || accordionSize || size,
        })
    }

    render() {
        const { disableContext } = this.props

        return (
            <AppContext.Consumer>
                {({ cardSize, dropdownSize, accordionSize } = {}) => {
                    const {
                        children,
                        color = 'default',
                        className,
                        rounded,
                        roundless,
                        block,
                        href,
                        striped,
                        iconOnly,
                        outline,
                        size = 'md',
                        arrow,
                        ...props
                    } = this.props

                    if (href) {
                        return (
                            <Link
                                to={href}
                                className={this.renderClassName(
                                    disableContext
                                        ? {}
                                        : {
                                              cardSize,
                                              dropdownSize,
                                              accordionSize,
                                          },
                                )}
                                {...props}
                            >
                                {children}
                            </Link>
                        )
                    }

                    return (
                        <div
                            className={this.renderClassName(
                                disableContext
                                    ? {}
                                    : { cardSize, dropdownSize, accordionSize },
                            )}
                            {...props}
                        >
                            {children}
                            {arrow && <ArrowIcon />}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export { Label }
export default { Label }
