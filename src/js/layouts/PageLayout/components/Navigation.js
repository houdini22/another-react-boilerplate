import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class Navigation extends React.Component {
    render() {
        const { children } = this.props

        return (
            <div className={cx('layout__sidebar__content__navigation')}>
                <ul
                    className={cx(
                        'layout__sidebar__content__navigation__links__links',
                    )}
                >
                    {children}
                </ul>
            </div>
        )
    }
}

Navigation.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
    ]),
}

export { Navigation }
export default { Navigation }
