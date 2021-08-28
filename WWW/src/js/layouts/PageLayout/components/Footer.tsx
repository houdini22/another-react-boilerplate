import * as React from "react"
import { Copyright } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class Footer extends React.Component {
    render() {
        return (
            <div className={cx('layout__container__footer')}>
                <Copyright />
            </div>
        )
    }
}

export { Footer }
export default { Footer }
