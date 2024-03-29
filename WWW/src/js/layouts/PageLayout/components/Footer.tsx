import * as React from 'react'
import { Copyright } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface FooterProps {
    floatingSidebar: boolean
}

class Footer extends React.Component<FooterProps, null> {
    render() {
        const { floatingSidebar } = this.props
        return (
            <div
                className={cx('layout__container__footer', {
                    [cx('layout__container__footer--floating-sidebar')]: floatingSidebar,
                })}
            >
                <Copyright />
            </div>
        )
    }
}

export { Footer }
export default { Footer }
