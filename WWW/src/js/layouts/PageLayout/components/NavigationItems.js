import React from 'react'
import { NavigationHeader } from './NavigationHeader'
import { NavigationLink } from './NavigationLink'
import { AuthManager } from '../../../containers/AuthManager'
import { RouteManager } from '../../../containers/RouteManager'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

const NavigationItems = ({ items }) => {
    return (
        <RouteManager>
            {({ match: { url } }) => (
                <AuthManager>
                    {({ auth: { isLoggedIn, user }, logoff }) => (
                        <ul
                            className={cx(
                                'layout__sidebar__content__navigation__links__links',
                            )}
                        >
                            {items.map((item) => {
                                const {
                                    type,
                                    caption,
                                    href,
                                    icon,
                                    authorizationRequired,
                                    componentType,
                                    children,
                                } = item

                                if (!isLoggedIn && authorizationRequired) {
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
                                            componentType={componentType}
                                            nested={children}
                                        >
                                            <span>{caption}</span>
                                        </NavigationLink>
                                    )
                                }
                            })}
                        </ul>
                    )}
                </AuthManager>
            )}
        </RouteManager>
    )
}

export { NavigationItems }
export default { NavigationItems }
