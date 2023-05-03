import * as React from 'react'
import classNames from 'classnames/bind'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import { selectors as authSelectors } from '../../../reducers/auth'
import { actions as commonActions, selectors as commonSelectors } from '../../../reducers/common'
import { bindActionCreators } from 'redux'
import styles1 from '../../../../assets/scss/layout/_layout.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

const { getLoginError } = authSelectors
const { getLayout } = commonSelectors

interface SidebarProps {
    children: any
    onClickLogout(): any
    isLoggedIn: boolean
    user: {
        username: string
    }
    loginError: string
    layout: {
        floatingSidebar: boolean
        sidebarExpanded: boolean
    }
    setLayoutOption(name: string, value: boolean): any
    submit(formName: string): any
}

interface SidebarState {}

class SidebarBase extends React.Component<SidebarProps, SidebarState> {
    render() {
        const {
            children,
            layout: { floatingSidebar, sidebarExpanded },
        } = this.props

        return (
            <div
                className={cx('layout__sidebar', {
                    'layout__sidebar--floating': floatingSidebar,
                    'layout__sidebar--expanded': sidebarExpanded,
                })}
                onMouseEnter={() => {
                    //setLayoutOption('sidebarExpanded', true)
                }}
                onMouseLeave={() => {
                    //setLayoutOption('sidebarExpanded', false)
                }}
            >
                <div className={cx('layout__sidebar__content')}>{children}</div>
            </div>
        )
    }
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
