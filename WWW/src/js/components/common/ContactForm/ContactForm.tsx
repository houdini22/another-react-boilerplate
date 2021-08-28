import React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../index'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_pages.scss'

const cx = classNames.bind(styles)

interface LoginFormProps {
    handleSubmit(): any;
}

export class LoginForm extends React.Component<LoginFormProps> {
    render() {
        const { handleSubmit, type } = this.props

        return (
            <form onSubmit={handleSubmit} className={cx('contact-form')}>
                <div>
                    <Field
                        name="email"
                        component={FormField}
                        type="text"
                        placeholder="E-mail"
                        inputOnly
                        autoComplete="off"
                        size={type === 'popover' ? 'sm' : undefined}
                        autoFocus
                    />
                    <Field
                        name="message"
                        component={FormField}
                        type="textarea"
                        placeholder="Message"
                        inputOnly
                        autoComplete="off"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        outline={type === 'popover'}
                        color="primary"
                    >
                        Send
                    </Button>
                </div>
            </form>
        )
    }
}

export default LoginForm
