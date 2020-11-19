import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import {
    Sidebar,
    SidebarHeader,
    Navigation,
    Container,
} from './components/index'
import { AuthManager } from '../../containers/AuthManager/index'
import classNames from 'classnames/bind'
import config from '../../config'
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

PageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    common: PropTypes.object.isRequired,
    setConnectionErrorModalVisible: PropTypes.func.isRequired,
}

export { PageLayout }
export default { PageLayout }
