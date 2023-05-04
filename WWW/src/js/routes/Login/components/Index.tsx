import * as React from 'react'
import styles from '../../../../assets/scss/routes/index.scss'
import { LoginFormContainer } from '../../../components/common/LoginForm/LoginFormContainer'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class IndexView extends React.Component<null, null> {
    render() {
        return (
            <div className={cx('route--index')}>
                <LoginFormContainer />
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
