import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { connect } from 'react-redux'
import { selectors as authSelectors, actions as authActions } from '../../../reducers/auth'
import { bindActionCreators } from 'redux'
import { apiURL } from '../../../helpers/api'
import { Dropdown, Button } from '../../../components'
import { RouteManager } from '../../../containers'

const cx = classNames.bind(styles)

interface BaseSidebarHeaderUserProps {}

class BaseSidebarHeaderUser extends React.Component<BaseSidebarHeaderUserProps, null> {
    render() {
        const {
            auth: { user },
            logoff,
        } = this.props

        if (!user) {
            return null
        }

        return (
            <RouteManager>
                {({ navigate }) => (
                    <span className={cx('layout__header__bar__right__element', 'layout__header__bar__right__element--user')}>
                        <Dropdown.Container placement={'right'}>
                            <Dropdown.Trigger component={Button}>
                                {user.avatar && (
                                    <span className={'layout__header__bar__right__element--user__avatar'}>
                                        <img src={apiURL(`files/preview/${user.avatar.id}`)} alt={''} />
                                    </span>
                                )}
                                <span className={'layout__header__bar__right__element--user__user-name'}>{user.name}</span>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        logoff().then(() => navigate('/login'))
                                    }}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Container>
                    </span>
                )}
            </RouteManager>
        )
    }
}

const SidebarHeaderUser = connect(
    (state) => ({
        auth: authSelectors.getState(state),
    }),
    (dispatch) => {
        return bindActionCreators(
            {
                logoff: authActions.logoff,
            },
            dispatch,
        )
    },
)(BaseSidebarHeaderUser)

export { SidebarHeaderUser }
