import * as React from 'react'
import styles from '../../../../assets/scss/routes/register.scss'
import { RegisterFormContainer } from '../../../components/common/RegisterForm/RegisterFormContainer'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class RegisterView extends React.Component<null, null> {
    render() {
        return (
            <div className={cx('route--register')}>
                <RegisterFormContainer />
            </div>
        )
    }
}

export default { RegisterView }
export { RegisterView }
