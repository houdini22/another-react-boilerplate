import * as React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Sidebar, SidebarHeader, Navigation, Container } from './components'
import { AuthManager } from '../../containers/AuthManager'
import classNames from 'classnames/bind'
import config from '../../config'
import styles from '../../../assets/scss/layout/_layout.scss'
import { Notifications } from './components/Notifications'
import { RouteManager } from '../../containers/RouteManager'
import { ConnectionErrorModal } from './components/ConnectionErrorModal'
import { ConnectionFetchErrorModal } from './components/ConnectionFetchErrorModal'

const cx = classNames.bind(styles)

interface PageLayoutProps {
    children: any
    common: object
    layout: {
        disableHeader: boolean
        disableFooter: boolean
        disableSidebar: boolean
    }
    connectionErrorModalVisible: {
        message: string
        status: number | null
        code: string
    }
}

class PageLayout extends React.Component<PageLayoutProps, null> {
    render() {
        const {
            children,
            layout: { disableHeader, disableFooter, disableSidebar },
            connectionErrorModalVisible: { message: connectionErrorMessage, code: connectionErrorCode },
            connectionFetchError: {
                message: connectionFetchErrorMessage,
                statusText: connectionErrorStatusText,
                data: connectionErrorStatusData,
            },
            setConnectionErrorModalVisible,
            setFetchError,
        } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
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
                                    {config.texts.frameworkName}
                                    <sub>{config.texts.version}</sub>
                                </SidebarHeader>

                                <Sidebar
                                    onClickLogout={() => {
                                        logoff().then(() => {
                                            navigate('/login')
                                        })
                                    }}
                                    isLoggedIn={isLoggedIn}
                                    user={user}
                                >
                                    <Scrollbars style={{ height: 'calc(100% - 70px)' }}>
                                        <Navigation />
                                    </Scrollbars>
                                </Sidebar>

                                <Container>{children}</Container>

                                <Notifications />

                                <ConnectionErrorModal
                                    visible={connectionErrorMessage === 'ERR_NETWORK'}
                                    message={connectionErrorCode}
                                    close={() => setConnectionErrorModalVisible({})}
                                />
                                <ConnectionFetchErrorModal
                                    data={connectionErrorStatusData}
                                    visible={connectionErrorStatusText === 'Internal Server Error'}
                                    message={connectionFetchErrorMessage}
                                    close={() => setFetchError({})}
                                />
                            </div>
                        )}
                    </AuthManager>
                )}
            </RouteManager>
        )
    }
}

export { PageLayout }
export default { PageLayout }
