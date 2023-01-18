import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectors } from '../reducers/auth'

const { getIsLoggedIn } = selectors

export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    authenticatedSelector: (state) => getIsLoggedIn(state),
    //redirectAction: routerActions.push,
    wrapperDisplayName: 'UserIsAuthenticated',
})
