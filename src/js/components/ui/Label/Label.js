import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FaAngleDown as ArrowIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_label.scss'

const cx = classNames.bind(styles)

class Label extends React.Component {
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
                        size,
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

Label.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    color: PropTypes.string,
    className: PropTypes.string,
    rounded: PropTypes.bool,
    roundless: PropTypes.bool,
    block: PropTypes.bool,
    href: PropTypes.string,
    iconOnly: PropTypes.bool,
    striped: PropTypes.bool,
    outline: PropTypes.bool,
    arrow: PropTypes.bool,
    size: PropTypes.string,
    disableContext: PropTypes.bool,
}

Label.defaultProps = {
    size: 'md',
}

export { Label }
export default { Label }
