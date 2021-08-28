import * as React from "react"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FaAngleDown as ArrowIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_badge.scss'

const cx = classNames.bind(styles)

interface BadgeProps {
    children: any,
    color: string,
    className: string,
    outline: boolean,
    href: string,
    size: string,
    arrow: boolean,
    disableContext: boolean,
    rounded: boolean,
    roundless: boolean,
    right: boolean,
}

class Badge extends React.Component<BadgeProps> {
    renderClassName({ cardSize, dropdownSize, accordionSize } = {}) {
        const {
            color = 'default',
            className,
            outline,
            href,
            size,
            arrow,
            rounded,
            roundless,
        } = this.props

        return cx('component-badge', {
            [className]: className,
            [`component-badge--color-${color}`]: color,
            [`component-badge--outline`]: outline,
            [`component-badge--link`]: href,
            [`component-badge--arrow`]: arrow,
            [`component-badge--rounded`]: rounded,
            [`component-badge--roundless`]: roundless,
            [`component-badge--size-${
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
                        href,
                        size = 'md',
                        arrow,
                        rounded,
                        ...props
                    } = this.props

                    if (href) {
                        return (
                            <Link
                                className={this.renderClassName(
                                    disableContext
                                        ? {}
                                        : {
                                              cardSize,
                                              dropdownSize,
                                              accordionSize,
                                          },
                                )}
                                to={href}
                            >
                                {children}
                                {arrow && (
                                    <ArrowIcon
                                        className={cx(
                                            'component-badge__arrow-icon',
                                        )}
                                    />
                                )}
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
                            {arrow && (
                                <ArrowIcon
                                    className={cx(
                                        'component-badge__arrow-icon',
                                    )}
                                />
                            )}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export { Badge }
export default { Badge }
