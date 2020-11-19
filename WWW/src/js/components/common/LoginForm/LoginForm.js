import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FormField, Button } from '../../index'
import { RouteManager } from '../../../containers/RouteManager'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/index.scss'

const cx = classNames.bind(styles)

export class LoginForm extends React.Component {
    render() {
        const {
            handleSubmit,
            submit,
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
                    {button && (
                        <Button
                            onClick={() => {
                                //submit()
                            }}
                        >
                            Login
                        </Button>
                    )}
                    {button && (
                        <RouteManager>
                            {({ history: { push } }) => (
                                <Button
                                    onClick={() => {
                                        push('/register')
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

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm
