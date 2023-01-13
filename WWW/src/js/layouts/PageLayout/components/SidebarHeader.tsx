import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { MdViewHeadline as ToggleIcon } from 'react-icons/md'
import {
    selectors as commonSelectors,
    actions as commonActions,
} from '../../../reducers/common'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { SidebarHeaderNotifications } from './SidebarHeaderNotifications'

const cx = classNames.bind(styles)

interface SidebarHeaderProps {
    children: any
    layout: {
        floatingSidebar: boolean
        sidebarExpanded: boolean
    }
    setLayoutOption(name: string, value: boolean): any
}

class SidebarHeaderBase extends React.Component<SidebarHeaderProps> {
    render() {
        const {
            children,
            layout: { floatingSidebar, sidebarExpanded },
            setLayoutOption,
        } = this.props

        return (
            <div
                className={cx('layout__header', {
                    [cx('layout__header--floating')]: floatingSidebar,
                    [cx('layout__header--expanded')]: sidebarExpanded,
                })}
            >
                <div
                    className={cx('layout__header__logo')}
                    onMouseOver={(e) => {
                        setLayoutOption('sidebarExpanded', true)
                    }}
                    onMouseOut={(e) => {
                        setLayoutOption('sidebarExpanded', false)
                    }}
                >
                    <Link to="/">
                        <h1 className={cx('layout__header__logo__brand')}>
                            {children}
                        </h1>
                    </Link>
                    <span
                        className={cx('layout__header__logo__toggle')}
                        onClick={() => {
                            setLayoutOption('floatingSidebar', !floatingSidebar)
                        }}
                    >
                        <ToggleIcon />
                    </span>
                </div>
                <div className={cx('layout__header__bar')}>
                    <div className={cx('layout__header__bar__left')} />
                    <div className={cx('layout__header__bar__right')}>
                        <SidebarHeaderNotifications />
                    </div>
                </div>
            </div>
        )
    }
}

const SidebarHeader = connect(
    (state) => ({
        layout: commonSelectors.getLayout(state),
    }),
    (dispatch) => {
        return bindActionCreators(
            {
                setLayoutOption: commonActions.setLayoutOption,
            },
            dispatch,
        )
    },
)(SidebarHeaderBase)

export { SidebarHeader }
export default { SidebarHeader }
