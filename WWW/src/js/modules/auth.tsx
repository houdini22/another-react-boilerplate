import * as React from 'react'
import { selectors, actions as commonActions } from '../reducers/auth'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from '../helpers/router'
import { LocalStorage } from './database'
import createReactClass from 'create-react-class'
import { AuthorizationManager } from '../containers/AuthorizationManager'
import Page401 from '../components/common/Page401/Index'

const { getIsLoggedIn } = selectors

const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn(state),
})

interface UserIsAuthenticatedRouteProps {
    children: any
    isLoggedIn: boolean
    location?: {
        pathname?: string
    }
    loginWithToken: Function
    navigate: Function
    permission?: string
}

class UserIsAuthenticatedRouteBase extends React.Component<UserIsAuthenticatedRouteProps, null> {
    componentDidMount() {
        const {
            isLoggedIn,
            navigate,
            loginWithToken,
            location: { pathname, search },
        } = this.props

        if (!isLoggedIn) {
            const { email, token } = LocalStorage.queryAll('LoginFormContainer', { query: { ID: 1 } })[0]

            loginWithToken(email, token).then(
                () => {},
                () => {
                    navigate(`/login?back=${pathname}${encodeURIComponent(search)}`)
                },
            )
        }
    }

    componentDidUpdate(prevProps: Readonly<UserIsAuthenticatedRouteProps>, prevState: Readonly<null>, snapshot?: any) {
        const {
            isLoggedIn,
            navigate,
            loginWithToken,
            location: { pathname, search },
        } = this.props
        if (!isLoggedIn && prevProps.isLoggedIn) {
            const { email, token } = LocalStorage.queryAll('LoginFormContainer', { query: { ID: 1 } })[0]

            loginWithToken(email, token).then(
                () => {},
                () => {
                    navigate(`/login?back=${pathname}${encodeURIComponent(search)}&reason=401`)
                },
            )
        }
    }

    render() {
        const { children, isLoggedIn, permission } = this.props

        if (!isLoggedIn) {
            return null
        }

        const Component = createReactClass({
            render: () => {
                return (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <>
                                {!!permission && canByPermission(permission) && children}
                                {!!permission && !canByPermission(permission) && <Page401 />}
                                {!permission && children}
                            </>
                        )}
                    </AuthorizationManager>
                )
            },
        })

        return <Component />

        /*return <AuthorizationManager>
            {({canByPermission}) => (
                <>{!!permission && canByPermission(permission) && children}
                    {!!permission && !canByPermission(permission) && <Page401/>}
                    {!permission && children}
                </>
            )}
        </AuthorizationManager>*/
    }
}

const UserIsAuthenticatedRoute = compose(
    connect(mapStateToProps, (dispatch) => {
        return bindActionCreators(
            {
                loginWithToken: commonActions.loginWithToken,
            },
            dispatch,
        )
    }),
    withRouter,
)(UserIsAuthenticatedRouteBase)

export { UserIsAuthenticatedRoute }
export default {
    UserIsAuthenticatedRoute,
}

/*
export const userIsAdmin = connectedRouterRedirect({
    redirectPath: '/',
        allowRedirectBack
:
    false,
        authenticatedSelector
:
    state => state.user.data !== null && state.user.data.isAdmin,
        redirectAction
:
    routerActions.replace,
        wrapperDisplayName
:
    'UserIsAdmin'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/foo',
        allowRedirectBack
:
    false,
        authenticatedSelector
:
    state => state.user.data === null && state.user.isLoading === false,
        redirectAction
:
    routerActions.replace,
        wrapperDisplayName
:
    'UserIsNotAuthenticated'
})
*/
