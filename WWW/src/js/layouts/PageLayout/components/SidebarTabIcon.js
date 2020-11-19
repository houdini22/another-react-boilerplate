import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'reactstrap'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class SidebarTabIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
    }

    render() {
        const { icon, iconCount, iconCountColor, children } = this.props
        const { hover } = this.state

        return (
            <div
                className={cx({
                    'sidebar-tab-icon__icon-box': true,
                    'sidebar-tab-icon__icon-box-hover': hover,
                })}
                id="icon-box"
                onMouseEnter={() => {
                    this.setState({ hover: true })
                }}
                onMouseLeave={() => {
                    this.setState({ hover: false })
                }}
            >
                <div className={cx('sidebar-tab-icon__icon-box-icon')}>
                    {icon}
                    {typeof iconCount !== 'undefined' && (
                        <Badge
                            color={iconCountColor}
                            className={cx('sidebar-tab-icon__icon-badge')}
                            size="sm"
                        >
                            {iconCount}
                        </Badge>
                    )}
                </div>
                <div className={cx('sidebar-tab-icon__icon-box-caption')}>
                    {children}
                </div>
            </div>
        )
    }
}

SidebarTabIcon.propTypes = {
    children: PropTypes.element,
    icon: PropTypes.element.isRequired,
    iconCount: PropTypes.number,
    iconCountColor: PropTypes.string,
}

export { SidebarTabIcon }
export default { SidebarTabIcon }
