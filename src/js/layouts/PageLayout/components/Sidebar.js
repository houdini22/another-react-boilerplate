import React from 'react'
import PropTypes from 'prop-types'
import { FaUser as UserIcon } from 'react-icons/fa'
import classNames from 'classnames/bind'
import { Alert, Button } from '../../../components'
import { LoginFormContainer } from '../../../components/common/LoginForm/LoginFormContainer'
import { submit } from 'redux-form'
import { FORM_NAME } from '../../../components/common/LoginForm/LoginFormContainer'
import { connect } from 'react-redux'
import { selectors as authSelectors } from '../../../reducers/auth'
import {
    actions as commonActions,
    selectors as commonSelectors,
} from '../../../reducers/common'
import { bindActionCreators } from 'redux'
import styles1 from '../../../../assets/scss/layout/_layout.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

const { getLoginError } = authSelectors
const { getLayout } = commonSelectors

class SidebarBase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userDropdownVisible: false,
            activeTab: '',
        }
        this.switchTab = this.switchTab.bind(this)
    }

    switchTab(activeTab) {
        this.setState({ activeTab })
    }

    componentDidUpdate(prevProps) {
        const { activeTab } = this.state

        if (
            prevProps['layout']['floatingSidebar'] &&
            prevProps['layout']['sidebarExpanded'] &&
            !this.props['layout']['sidebarExpanded'] &&
            activeTab
        ) {
            this.setState({ activeTab: '' })
        }
    }

    render() {
        const {
            children,
            onClickLogout,
            isLoggedIn,
            user,
            loginError,
            layout: { floatingSidebar, sidebarExpanded },
            setLayoutOption,
            submit,
        } = this.props
        const { activeTab } = this.state

        return (
            <div
                className={cx('layout__sidebar', {
                    'layout__sidebar--floating': floatingSidebar,
                    'layout__sidebar--expanded': sidebarExpanded,
                })}
                onMouseEnter={(e) => {
                    setLayoutOption('sidebarExpanded', true)
                }}
                onMouseLeave={(e) => {
                    setLayoutOption('sidebarExpanded', false)
                }}
            >
                <div className={cx('layout__sidebar__content')}>{children}</div>
                <div
                    className={cx({
                        'layout__sidebar__sidebar-tabs': true,
                        'layout__sidebar--is-tab-active': activeTab !== '',
                    })}
                >
                    <div className={cx('layout__sidebar__tabs')}>
                        <ul>
                            <li
                                className={cx('layout__sidebar__tabs__tab', {
                                    'layout__sidebar__tabs__tab--active':
                                        activeTab === 'user',
                                })}
                                onClick={() => {
                                    if (activeTab === 'user') {
                                        this.switchTab('')
                                    } else {
                                        this.switchTab('user')
                                    }
                                }}
                            >
                                <UserIcon />
                            </li>
                        </ul>
                    </div>
                    <div className={cx('layout__sidebar__tabs-content')}>
                        {activeTab === 'user' && (
                            <div>
                                <div>
                                    {!isLoggedIn && [
                                        !loginError ? (
                                            <Alert
                                                color="warning"
                                                outline
                                                key="warning"
                                            >
                                                <div
                                                    className={cx(
                                                        'text-center',
                                                    )}
                                                >
                                                    Not logged in!
                                                </div>
                                            </Alert>
                                        ) : null,
                                        loginError ? (
                                            <Alert
                                                color="danger"
                                                outline
                                                key="danger"
                                            >
                                                <div
                                                    className={cx(
                                                        'text-center',
                                                    )}
                                                >
                                                    Wrong Credentials
                                                </div>
                                            </Alert>
                                        ) : null,
                                        <LoginFormContainer />,
                                    ]}
                                    {isLoggedIn && (
                                        <Alert
                                            color="success"
                                            outline
                                            key="success"
                                        >
                                            <div className={cx('text-center')}>
                                                Logged as:
                                                <br />
                                                {user['username']}
                                            </div>
                                        </Alert>
                                    )}
                                </div>
                                <div
                                    className={cx(
                                        'layout__sidebar__tabs-content__buttons-container',
                                    )}
                                >
                                    {isLoggedIn && (
                                        <span>
                                            <Button
                                                color="primary"
                                                roundless
                                                onClick={onClickLogout}
                                            >
                                                Log out
                                            </Button>
                                        </span>
                                    )}
                                    {!isLoggedIn && (
                                        <Button
                                            color="primary"
                                            roundless
                                            onClick={() => submit(FORM_NAME)}
                                        >
                                            Log in
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

SidebarBase.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
    ]),
    onClickLogout: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

const Sidebar = connect(
    (state) => {
        return {
            loginError: getLoginError(state),
            layout: getLayout(state),
        }
    },
    (dispatch) => {
        return bindActionCreators(
            {
                setLayoutOption: commonActions.setLayoutOption,
                submit,
            },
            dispatch,
        )
    },
)(SidebarBase)

export { Sidebar }
export default { Sidebar }
