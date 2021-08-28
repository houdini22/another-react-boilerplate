import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import {
    Sidebar,
    SidebarHeader,
    Navigation,
    Container,
} from './components'
import { AuthManager } from '../../containers/AuthManager'
import classNames from 'classnames/bind'
import config from '../../config'
import styles from '../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface PageLayoutProps {
    children: any;
    common: object;
    setConnectionErrorModalVisible(): any;
}

class PageLayout extends React.Component<PageLayoutProps> {
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
            layout: { disableHeader, disableFooter, disableSidebar },
        } = this.props

        return (
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
                                logoff().then(() => {})
                            }}
                            isLoggedIn={isLoggedIn}
                            user={user}
                        >
                            <Scrollbars style={{ height: 'calc(100% - 70px)' }}>
                                <Navigation />
                            </Scrollbars>
                        </Sidebar>

                        <Container>{children}</Container>
                    </div>
                )}
            </AuthManager>
        )
    }
}

export { PageLayout }
export default { PageLayout }
