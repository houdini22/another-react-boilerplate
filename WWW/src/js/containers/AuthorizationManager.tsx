import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectors as authSelectors } from '../reducers/auth'

interface AuthorizationManagerProps {
    isLoggedIn: boolean
}

class AuthorizationManagerBase extends React.Component<AuthorizationManagerProps, null> {
    hasRole(role) {
        const { user } = this.props

        if (user.roles.includes('Super Admin')) {
            return true
        }

        return user.roles.includes(role)
    }
    hasPermission(permission) {
        const { user } = this.props

        if (user?.roles?.includes('Super Admin')) {
            //return true;
        }

        if (Array.isArray(permission)) {
            const hasPermission =
                permission
                    .map((p) => {
                        return user.roles.includes(p)
                    })
                    .filter((p) => !p).length > 0

            return hasPermission
        }

        return user?.permissions?.includes(permission)
    }
    render() {
        const { children } = this.props
        const renderProps = {
            canByRole: this.hasRole.bind(this),
            canByPermission: this.hasPermission.bind(this),
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: authSelectors.getIsLoggedIn(state),
    user: authSelectors.getState(state)['user'],
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

const AuthorizationManager = connect(mapStateToProps, mapDispatchToProps)(AuthorizationManagerBase)

export { AuthorizationManager }
