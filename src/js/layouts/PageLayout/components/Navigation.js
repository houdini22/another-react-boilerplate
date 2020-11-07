import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { navigation } from '../../../config/navigation'
import { NavigationHeader } from './NavigationHeader'
import { NavigationLink } from './NavigationLink'
import { AuthManager } from '../../../containers/AuthManager'
import { RouteManager } from '../../../containers/RouteManager'

const cx = classNames.bind(styles)

class Navigation extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ match: { url } }) => (
                    <AuthManager>
                        {({ auth: { isLoggedIn, user }, logoff }) => (
                            <div
                                className={cx(
                                    'layout__sidebar__content__navigation',
                                )}
                            >
                                <ul
                                    className={cx(
                                        'layout__sidebar__content__navigation__links__links',
                                    )}
                                >
                                    {navigation.map((item) => {
                                        const {
                                            type,
                                            caption,
                                            href,
                                            icon,
                                            authorizationRequired,
                                            componentType,
                                        } = item

                                        if (
                                            !isLoggedIn &&
                                            authorizationRequired
                                        ) {
                                            return null
                                        }

                                        if (type === 'header') {
                                            return (
                                                <NavigationHeader
                                                    caption={caption}
                                                    key={`${type}-${caption}`}
                                                />
                                            )
                                        } else if (type === 'link') {
                                            return (
                                                <NavigationLink
                                                    href={href}
                                                    icon={icon}
                                                    key={`${type}-${caption}-${href}`}
                                                    active={url === href}
                                                    componentType={
                                                        componentType
                                                    }
                                                >
                                                    <span>{caption}</span>
                                                </NavigationLink>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        )}
                    </AuthManager>
                )}
            </RouteManager>
        )
    }
}

Navigation.propTypes = {}

export { Navigation }
export default { Navigation }
