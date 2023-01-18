import React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_blank_page_layout.scss'

const cx = classNames.bind(styles)

export const Header = ({ children }) => {
    return (
        <div className={cx('layout__header')}>
            <div className={cx('layout__header__container')}>{children}</div>
        </div>
    )
}
