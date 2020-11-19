import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class NavigationHeader extends React.Component {
    render() {
        const { caption } = this.props

        return (
            <li
                className={cx(
                    'layout__sidebar__content__navigation__links__links__header',
                )}
            >
                <h3>
                    <span>{caption}</span>
                </h3>
            </li>
        )
    }
}

NavigationHeader.propTypes = {
    caption: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired,
    ]),
}

export { NavigationHeader }
export default { NavigationHeader }
