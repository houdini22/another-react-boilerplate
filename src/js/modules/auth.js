// import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectors } from '../reducers/auth'

// const locationHelper = locationHelperBuilder({})

const { getIsLoggedIn } = selectors

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: (state) => getIsLoggedIn(state),
  //redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
})

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
