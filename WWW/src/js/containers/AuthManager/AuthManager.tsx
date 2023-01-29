import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectors as authSelectors, actions as authActions } from '../../reducers/auth'

interface AuthManagerProps {
    auth: object
    children(renderProps: { auth: any; logoff(): any }): any
    logoff(): any
}

class AuthManagerBase extends React.Component<AuthManagerProps> {
    render() {
        const { auth, children, logoff } = this.props
        const renderProps = {
            auth,
            logoff,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    auth: authSelectors.getState(state),
    isLoggedIn: authSelectors.getIsLoggedIn(state),
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            logoff: authActions.logoff,
        },
        dispatch,
    )
}

const AuthManager = connect(mapStateToProps, mapDispatchToProps)(AuthManagerBase)

export { AuthManager }
export default { AuthManager }
