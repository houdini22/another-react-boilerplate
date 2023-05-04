import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Button, LoadingOverlay, Alert, Row, Col } from '../../index'
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
}

export class LoginForm extends React.Component<LoginFormProps, null> {
    render() {
        const {
            handleSubmit,
            initialValues: { username },
            isLoading,
            loginError,
        } = this.props

        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <Row className={'row'}>
                        <Col xs={1} sm={3} md={4} />
                        <Col xs={10} sm={6} md={4}>
                            <form onSubmit={handleSubmit}>
                                {loginError && <Alert color={'danger'}>{loginError}</Alert>}
                                {query['reason'] === '401' && !loginError && (
                                    <Alert color={'danger'}>You was logged out.</Alert>
                                )}
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
                                <Row>
                                    <Col xs={6}>
                                        <Button type={'submit'} block>
                                            Login
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button
                                            onClick={() => {
                                                navigate('/register')
                                            }}
                                            block
                                        >
                                            Register
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

export default LoginForm
