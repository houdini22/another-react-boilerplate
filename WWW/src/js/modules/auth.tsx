// import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import * as React from 'react';
import { selectors, actions as commonActions } from '../reducers/auth'
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {Navigate} from "react-router";
import {withRouter} from "../helpers/router";
import {LocalStorage} from "./database";

// const locationHelper = locationHelperBuilder({})

const { getIsLoggedIn } = selectors

const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn(state)
})

interface UserIsAuthenticatedRouteProps {
    children: any;
    isLoggedIn: boolean;
    location?: {
        pathname?: string;
        params?: {
            back?: string;
        }
    }
    loginWithToken: Function
    navigate: Function
}

class UserIsAuthenticatedRouteBase extends React.Component<UserIsAuthenticatedRouteProps> {
    componentDidMount() {
        const {isLoggedIn, navigate, loginWithToken} = this.props;
        const {email, token} = LocalStorage.queryAll("LoginFormContainer", {query: {ID: 1}})[0];
        if (!isLoggedIn) {
            loginWithToken(email, token).then(() => null);
        }
    }

    render() {
        const {isLoggedIn, location: {pathname}, children} = this.props;

        if (!isLoggedIn) {
            return (
                <>
                    <Navigate to={`/login?back=${pathname}`}/>
                </>
            )
        }

        return (<>
            {children}
        </>);
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
    withRouter
)(UserIsAuthenticatedRouteBase)

export { UserIsAuthenticatedRoute }
export default { UserIsAuthenticatedRoute }

/*
export const userIsAdmin = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.data !== null && state.user.data.isAdmin,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAdmin'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/foo',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.data === null && state.user.isLoading === false,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
*/
