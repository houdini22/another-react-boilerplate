import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Button } from '../../index'
import { RouteManager } from '../../../containers/RouteManager'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/index.scss'

const cx = classNames.bind(styles)

interface LoginFormProps {
    handleSubmit(): any
    submit(): any
    initialValues: {
        username: string
    }
    button: any
}

export class LoginForm extends React.Component<LoginFormProps> {
    render() {
        const {
            handleSubmit,
            initialValues: { username },
            button,
        } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="username"
                    component={FormField}
                    type="text"
                    placeholder="E-mail"
                    inputOnly
                    autoComplete="off"
                    size="sm"
                    autoFocus={!username}
                />
                <Field
                    name="password"
                    component={FormField}
                    type="password"
                    placeholder="Password"
                    inputOnly
                    autoComplete="off"
                    size="sm"
                    autoFocus={!!username}
                />
                <div className={cx('buttons-container')}>
                    {button && <Button type={'submit'}>Login</Button>}
                    {button && (
                        <RouteManager>
                            {({ navigate }) => (
                                <Button
                                    onClick={() => {
                                        navigate('/register')
                                    }}
                                >
                                    Register
                                </Button>
                            )}
                        </RouteManager>
                    )}
                </div>
            </form>
        )
    }
}

export default LoginForm
