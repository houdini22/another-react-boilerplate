import * as React from 'react'
import { NavigationHeader } from './NavigationHeader'
import { NavigationLink } from './NavigationLink'
import { AuthManager, RouteManager, AuthorizationManager } from '../../../containers'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

const NavigationItems = ({ items, setNested, nestedIds }) => {
    return (
        <RouteManager>
            {({ location: { pathname } }) => (
                <AuthManager>
                    {({ auth: { isLoggedIn } }) => (
                        <AuthorizationManager>
                            {({ canByPermission }) => (
                                <ul className={cx('layout__sidebar__content__navigation__links__links')}>
                                    {items.map((item) => {
                                        const {
                                            type,
                                            caption,
                                            href,
                                            icon,
                                            authorizationRequired,
                                            componentType,
                                            children,
                                            urlActive = [],
                                            permission,
                                        } = item

                                        if (!isLoggedIn && authorizationRequired) {
                                            return null
                                        }

                                        if ((typeof permission === 'string' || Array.isArray(permission)) && !canByPermission(permission)) {
                                            return null
                                        }

                                        if (type === 'header') {
                                            return <NavigationHeader caption={caption} key={`${type}-${caption}`} />
                                        } else if (type === 'link') {
                                            return (
                                                <NavigationLink
                                                    href={href}
                                                    icon={icon}
                                                    key={`${type}-${caption}-${href}`}
                                                    active={urlActive.map((regexp) => regexp.test(pathname)).filter((v) => !!v).length > 0}
                                                    componentType={componentType}
                                                    nested={children}
                                                    setNested={setNested}
                                                    nestedId={`${type}-${caption}-${href}`}
                                                    nestedIds={nestedIds}
                                                >
                                                    <span>{caption}</span>
                                                </NavigationLink>
                                            )
                                        }
                                    })}
                                </ul>
                            )}
                        </AuthorizationManager>
                    )}
                </AuthManager>
            )}
        </RouteManager>
    )
}

export { NavigationItems }
