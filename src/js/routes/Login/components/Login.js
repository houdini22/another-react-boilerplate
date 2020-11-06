import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { AuthManager } from '../../../containers/AuthManager/index'
import { RouteManager } from '../../../containers/RouteManager/index'
import LoginFormContainer from '../../../components/common/LoginForm/LoginFormContainer'
import { Alert } from '../../../components/index'

export class LoginView extends React.Component {
    render() {
        return (
            <AuthManager>
                {({ auth: { loginError, isLoggedIn } }) => (
                    <RouteManager>
                        {({ query: { msg } }) => (
                            <PageContent>
                                {msg === 'not_authenticated' && (
                                    <Alert
                                        color="danger"
                                        className="error-message"
                                    >
                                        Akcja wymaga zalogowania!
                                    </Alert>
                                )}
                                {msg === 'logged_off' && (
                                    <Alert color="info">
                                        Zostałeś wylogowany!
                                    </Alert>
                                )}
                                <div className="login__login-container-outer">
                                    <div className="login__login-container-inner">
                                        {loginError && (
                                            <Alert
                                                color="danger"
                                                className="error-message"
                                            >
                                                Złe dane logowania!
                                            </Alert>
                                        )}
                                        {isLoggedIn && (
                                            <Alert
                                                color="success"
                                                className="success-message"
                                            >
                                                Jesteś zalogowany!
                                            </Alert>
                                        )}
                                        {!isLoggedIn && <LoginFormContainer />}
                                    </div>
                                </div>
                            </PageContent>
                        )}
                    </RouteManager>
                )}
            </AuthManager>
        )
    }
}

LoginView.propTypes = {}

export default LoginView
