import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { AuthManager } from '../../../containers/AuthManager'
import { RouteManager } from '../../../containers/RouteManager'
import LoginFormContainer from '../../../components/common/LoginForm/LoginFormContainer'
import { Alert } from '../../../components'

export class LoginView extends React.Component<null, null> {
    render() {
        return (
            <AuthManager>
                {({ auth: { loginError, isLoggedIn } }) => (
                    <RouteManager>
                        {({ query: { msg } }) => (
                            <PageContent>
                                {msg === 'not_authenticated' && (
                                    <Alert color="danger" className="error-message">
                                        Akcja wymaga zalogowania!
                                    </Alert>
                                )}
                                {msg === 'logged_off' && <Alert color="info">Zostałeś wylogowany!</Alert>}
                                <div className="login__login-container-outer">
                                    <div className="login__login-container-inner">
                                        {loginError && (
                                            <Alert color="danger" className="error-message">
                                                Złe dane logowania!
                                            </Alert>
                                        )}
                                        {isLoggedIn && (
                                            <Alert color="success" className="success-message">
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

export default LoginView
