import React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface NavigationHeaderProps {
    caption: any;
}

class NavigationHeader extends React.Component<NavigationHeaderProps> {
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

export { NavigationHeader }
export default { NavigationHeader }
