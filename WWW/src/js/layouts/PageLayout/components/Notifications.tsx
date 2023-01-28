import * as React from 'react'
import classNames from 'classnames/bind'
import styles1 from '../../../../assets/scss/layout/_layout.scss'
import styles2 from '../../../../assets/scss/_animations.scss'
import { Link } from 'react-router-dom'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FaInfoCircle } from 'react-icons/fa'
import { TiWarning } from 'react-icons/ti'
import { CgDanger } from 'react-icons/cg'
import { AiTwotoneLike } from 'react-icons/ai'
import {
    selectors as commonSelectors,
    ToastNotification,
} from '../../../reducers/notifications'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const cx = classNames.bind({ ...styles1, ...styles2 })

interface NotificationsProps {
    toastNotifications: Array<ToastNotification>
}

class NotificationsBase extends React.Component<NotificationsProps> {
    getIcon(type) {
        switch (type) {
            case 'default':
                return <IoIosNotificationsOutline />

            case 'primary':
                return <IoIosNotificationsOutline />

            case 'secondary':
                return <IoIosNotificationsOutline />

            case 'info':
                return <FaInfoCircle />

            case 'warning':
                return <TiWarning />

            case 'danger':
                return <CgDanger />

            case 'success':
                return <AiTwotoneLike />
        }
    }
    render() {
        const { toastNotifications } = this.props

        return (
            <div className={cx('layout__notifications')}>
                <div className={cx('layout__notifications__container')}>
                    <ul>
                        {toastNotifications.map(
                            ({ id, type, text, title, href }) => {
                                return (
                                    <li
                                        className={cx(
                                            'layout__notifications__container__notification',
                                            'animation--sweet-show',
                                            {
                                                [cx(
                                                    `layout__notifications__container__notification--color-${type}`,
                                                )]: type,
                                            },
                                        )}
                                    >
                                        <Link to={href}>
                                            <span
                                                className={cx(
                                                    'layout__notifications__container__notification__icon',
                                                )}
                                            >
                                                {this.getIcon(type)}
                                            </span>
                                            <span
                                                className={cx(
                                                    'layout__notifications__container__notification__content',
                                                )}
                                            >
                                                <span
                                                    className={cx(
                                                        'layout__notifications__container__notification__content__title',
                                                    )}
                                                >
                                                    {title}
                                                </span>
                                                <span
                                                    className={cx(
                                                        'layout__notifications__container__notification__content__text',
                                                    )}
                                                >
                                                    {text}
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                )
                            },
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    toastNotifications: commonSelectors['getToastNotifications'](state),
})

const Notifications = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators({}, dispatch)
})(NotificationsBase)
export { Notifications }
export default { Notifications }
