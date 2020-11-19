import React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_typography.scss'

const cx = classNames.bind(styles)

class Container extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-typography')}>{children}</div>
    }
}

export { Container }
export default { Container }
