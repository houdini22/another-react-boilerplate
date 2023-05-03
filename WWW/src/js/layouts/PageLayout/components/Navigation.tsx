import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { navigation } from '../../../config/navigation'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

class Navigation extends React.Component<null, null> {
    render() {
        return (
            <div className={cx('layout__sidebar__content__navigation')}>
                <NavigationItems items={navigation}></NavigationItems>
            </div>
        )
    }
}

export { Navigation }
export default { Navigation }
