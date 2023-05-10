import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Button, LoadingOverlay, Alert, Row, Col } from '../../index'
import { RouteManager } from '../../../containers'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/index.scss'

const cx = classNames.bind(styles)

interface LoginFormProps {
    handleSubmit(): any

    submit(): any

    initialValues: {
        username: string
    }
}

export class RegisterForm extends React.Component<LoginFormProps, null> {
    render() {
        const { handleSubmit, isLoading } = this.props

        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <Row className={'row'}>
                        <Col xs={1} sm={3} md={4} />
                        <Col xs={10} sm={6} md={4}>
                            <form onSubmit={handleSubmit}>
                                <Field
                                    name="name"
                                    component={FormField}
                                    type="text"
                                    placeholder="Username"
                                    inputOnly
                                    autoComplete="off"
                                    size="sm"
                                    autoFocus
                                />
                                <Field name="email" component={FormField} type="text" placeholder="E-mail" inputOnly autoComplete="off" size="sm" />
                                <Field
                                    name="password"
                                    component={FormField}
                                    type="password"
                                    placeholder="Password"
                                    inputOnly
                                    autoComplete="off"
                                    size="sm"
                                />
                                <Field
                                    name="password_confirmation"
                                    component={FormField}
                                    type="password"
                                    placeholder="Repeat Password"
                                    inputOnly
                                    autoComplete="off"
                                    size="sm"
                                />
                                <Row>
                                    <Col xs={12}>
                                        <Button type={'submit'} block>
                                            <span>Register</span>
                                        </Button>
                                    </Col>
                                </Row>
                                {isLoading && <LoadingOverlay />}
                            </form>
                        </Col>
                        <Col xs={1} sm={3} md={4} />
                    </Row>
                )}
            </RouteManager>
        )
    }
}

export default RegisterForm
