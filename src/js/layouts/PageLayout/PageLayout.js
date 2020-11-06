import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Scrollbars } from 'react-custom-scrollbars'
import {
    Sidebar,
    SidebarHeader,
    Navigation,
    NavigationLink,
    NavigationHeader,
    Container,
} from './components/index'
import { RouteManager } from '../../containers/RouteManager/index'
import { AuthManager } from '../../containers/AuthManager/index'
import classNames from 'classnames/bind'
import config from '../../config'
import { navigation } from '../../config/navigation'
import styles from '../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class PageLayout extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        const { setConnectionErrorModalVisible } = this.props
        setConnectionErrorModalVisible(false)
    }

    render() {
        const {
            children,
            layout: {
                disableHeader,
                disableFooter,
                disableSidebar,
                floatingSidebar,
            },
        } = this.props

        const MyNavigation = createReactClass({
            render() {
                return (
                    <RouteManager>
                        {({ match: { url } }) => (
                            <AuthManager>
                                {({ auth: { isLoggedIn, user }, logoff }) => (
                                    <Navigation>
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
                                    </Navigation>
                                )}
                            </AuthManager>
                        )}
                    </RouteManager>
                )
            },
        })

        return (
            <RouteManager>
                {({ match: { url } }) => (
                    <AuthManager>
                        {({ auth: { isLoggedIn, user }, logoff }) => (
                            <div
                                className={cx('layout', {
                                    'layout--disable-header': disableHeader,
                                    'layout--disable-footer': disableFooter,
                                    'layout--disable-sidebar': disableSidebar,
                                })}
                            >
                                <SidebarHeader>
                                    <strong>
                                        {config.texts.frameworkName}
                                    </strong>{' '}
                                    framework
                                    <sub>{config.texts.version}</sub>
                                </SidebarHeader>

                                <Sidebar
                                    onClickLogout={() => {
                                        logoff().then(() => {})
                                    }}
                                    isLoggedIn={isLoggedIn}
                                    user={user}
                                >
                                    <Scrollbars
                                        style={{ height: 'calc(100% - 70px)' }}
                                    >
                                        <MyNavigation />
                                    </Scrollbars>
                                </Sidebar>

                                <Container>{children}</Container>
                            </div>
                        )}
                    </AuthManager>
                )}
            </RouteManager>
        )
    }
}

PageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    common: PropTypes.object.isRequired,
    setConnectionErrorModalVisible: PropTypes.func.isRequired,
}

export { PageLayout }
export default { PageLayout }
