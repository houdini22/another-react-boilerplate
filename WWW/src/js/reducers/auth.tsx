import { http, setAuthToken } from '../modules/http'
import { LocalStorage } from '../modules/database'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'auth::logged_in'
export const LOGGED_OFF = 'auth::logged_off'
export const SET_LOGIN_ERROR = 'auth::set_login_error'
export const SET_IS_LOADING = 'auth::set_is_loading'

// ------------------------------------
// Actions
// ------------------------------------
const setIsLoading = (isLoading) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: isLoading })
}
const loggedIn = (data) => (dispatch) => {
    dispatch({ type: LOGGED_IN, payload: data })
}

const loggedOff = () => (dispatch) => {
    dispatch({ type: LOGGED_OFF })
}

const setLoginError = (value) => (dispatch) => {
    dispatch({ type: SET_LOGIN_ERROR, payload: value })
}

const login = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
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
                        data: { user },
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
                    dispatch(setIsLoading(false))

                    resolve(user)
                },
                ({ data: { message = '' } = {} }) => {
                    dispatch(setIsLoading(false))
                    dispatch(setLoginError(message))
                },
            )
    })
}

const loginWithToken = (email, token) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setLoginError(''))

        http.post('/auth/login_with_token', {
            email,
            token,
        })
            .then((response) => {
                dispatch(loggedIn(response.data.data.user))
                setAuthToken(response.data.data.user.token)

                LocalStorage.update('LoginFormContainer', { ID: 1 }, (row) => {
                    row.email = response.data.data.user.email
                    row.token = response.data.data.user.token
                    return row
                })
                LocalStorage.commit()

                resolve(response.data.data.user)
            })
            .catch(({ data: { message = '' } = {} }) => {
                dispatch(setLoginError(message))
                reject()
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
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoggedIn: false,
    user: {},
    loginError: '',
    isLoading: false,
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
