import { http, setAuthToken } from '../modules/http'
import { LocalStorage } from '../modules/database'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'auth::logged_in'
export const LOGGED_OFF = 'auth::logged_off'
export const SET_LOGIN_ERROR = 'auth::set_login_error'
export const SET_IS_LOADING = 'auth::set_is_loading'
export const GENTLY_LOG_OFF = 'auth::gently-log-off'
export const SET_LOGIN_WITH_TOKEN_REQUEST_IN_PROGRESS = 'auth::set-login-with-token-request-in-progress'
export const SET_USER_DATA = 'auth::set-user-data'

// ------------------------------------
// Actions
// ------------------------------------
const setIsLoading = (isLoading) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: isLoading })
}
const loggedIn = (data) => (dispatch) => {
    dispatch({ type: LOGGED_IN, payload: data })
}
const setUserData = (data) => (dispatch) => {
    dispatch({ type: SET_USER_DATA, payload: data })
}

const loggedOff = () => (dispatch) => {
    dispatch({ type: LOGGED_OFF })
}

const setLoginError = (value) => (dispatch) => {
    dispatch({ type: SET_LOGIN_ERROR, payload: value })
}

const setLoginWithTokenRequestInProgress = (value) => (dispatch) => {
    dispatch({ type: SET_LOGIN_WITH_TOKEN_REQUEST_IN_PROGRESS, payload: value })
}

const gentlyLogOff = () => (dispatch) => {
    dispatch({ type: GENTLY_LOG_OFF })
}

const login = (email, password) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch(setIsLoading(true))
        dispatch(setLoginError(''))

        return http
            .post('/auth/login', {
                email,
                password,
            })
            .then(
                ({
                    data: {
                        data: {
                            data: { data },
                        },
                    },
                }) => {
                    dispatch(loggedIn(data))
                    setAuthToken(data.token)

                    LocalStorage.update('LoginFormContainer', { ID: 1 }, (row) => {
                        row.email = data.email
                        row.token = data.token
                        return row
                    })
                    LocalStorage.commit()
                    dispatch(setIsLoading(false))

                    resolve(data)
                },
                ({ data: { message = '' } = {} }) => {
                    dispatch(setIsLoading(false))
                    dispatch(setLoginError(message))
                },
            )
    })
}

const loginWithToken = (email, token) => (dispatch, state) => {
    return new Promise((resolve, reject) => {
        if (state()['auth']['loginWithTokenRequestInProgress']) {
            return
        }

        dispatch(setLoginWithTokenRequestInProgress(true))
        dispatch(setLoginError(''))

        http.post('/auth/login_with_token', {
            email,
            token,
        })
            .then(
                ({
                    data: {
                        data: {
                            data: { data: user },
                        },
                    },
                }) => {
                    dispatch(loggedIn(user))
                    setAuthToken(user.token)

                    LocalStorage.update('LoginFormContainer', { ID: 1 }, (row) => {
                        row.email = user.email
                        row.token = user.token
                        return row
                    })
                    LocalStorage.commit()

                    resolve(user)
                    dispatch(setLoginWithTokenRequestInProgress(true))
                },
            )
            .catch(({ data: { message = '' } = {} }) => {
                dispatch(setLoginError(message))
                reject()
                dispatch(setLoginWithTokenRequestInProgress(false))
            })
    })
}

const logoff = () => (dispatch) => {
    return new Promise((resolve) => {
        http.post('/auth/logout').then(() => {
            dispatch(loggedOff())
            setAuthToken('')
            resolve(true)
        })
    })
}

export const actions = {
    loggedIn,
    loggedOff,
    setLoginError,
    login,
    logoff,
    loginWithToken,
    setIsLoading,
    gentlyLogOff,
    setUserData,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOGGED_IN]: (state, { payload }) => {
        return {
            ...state,
            isLoggedIn: true,
            user: payload,
        }
    },
    [LOGGED_OFF]: (state) => {
        return {
            ...state,
            isLoggedIn: false,
            user: {},
        }
    },
    [SET_IS_LOADING]: (state, { payload }) => {
        return {
            ...state,
            isLoading: payload,
        }
    },
    [SET_LOGIN_ERROR]: (state, { payload }) => {
        return {
            ...state,
            loginError: payload,
        }
    },
    [GENTLY_LOG_OFF]: () => {
        return getInitialState()
    },
    [SET_LOGIN_WITH_TOKEN_REQUEST_IN_PROGRESS]: (state, { payload }) => {
        return {
            ...state,
            loginWithTokenRequestInProgress: payload,
        }
    },
    [SET_USER_DATA]: (state, { payload }) => {
        return {
            ...state,
            user: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoggedIn: false,
    user: {},
    loginError: '',
    isLoading: false,
    loginWithTokenRequestInProgress: false,
})

export default function userReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['auth']
const getIsLoggedIn = (state) => getState(state)['isLoggedIn']
const getLoginError = (state) => getState(state)['loginError']
const getIsLoading = (state) => getState(state)['isLoading']

export const selectors = {
    getState,
    getIsLoggedIn,
    getLoginError,
    getIsLoading,
}
