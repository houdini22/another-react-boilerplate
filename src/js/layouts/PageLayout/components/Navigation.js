import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { navigation } from '../../../config/navigation'
import { NavigationHeader } from './NavigationHeader'
import { NavigationLink } from './NavigationLink'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

class Navigation extends React.Component {
    render() {
        return (
            <div className={cx('layout__sidebar__content__navigation')}>
                <NavigationItems items={navigation}></NavigationItems>
            </div>
        )
    }
}

Navigation.propTypes = {}

export { Navigation }
export default { Navigation }
