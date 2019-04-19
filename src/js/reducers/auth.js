import { http, setAuthToken } from '../modules/http'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'auth::logged_in'
export const LOGGED_OFF = 'auth::logged_off'
export const SET_LOGIN_ERROR = 'auth::set_login_error'

// ------------------------------------
// Actions
// ------------------------------------
const loggedIn = data => dispatch => {
  dispatch({ type: LOGGED_IN, payload: data })
}

const loggedOff = () => dispatch => {
  dispatch({ type: LOGGED_OFF })
}

const setLoginError = value => dispatch => {
  dispatch({ type: SET_LOGIN_ERROR, payload: value })
}

const login = (email, password) => dispatch => {
  return new Promise(resolve => {
    dispatch(setLoginError(false))

    http
      .post('/auth/login', {
        email,
        password,
      })
      .then(response => {
        dispatch(loggedIn(response.data.data.user))
        setAuthToken(response.data.data.user.token)
        resolve()
      })
      .catch(() => {
        dispatch(setLoginError(true))
      })
  })
}

const logoff = () => dispatch => {
  return new Promise(resolve => {
    http.post('/auth/logout').then(() => {
      dispatch(loggedOff())
      setAuthToken('')
      resolve()
    })
  })
}

export const actions = {
  loggedIn,
  loggedOff,
  setLoginError,
  login,
  logoff,
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
  [LOGGED_OFF]: state => {
    return {
      ...state,
      isLoggedIn: false,
      user: null,
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
  loginError: false,
})

export default function userReducer(state = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// selectors

const getState = state => state['auth']
const getIsLoggedIn = state => getState(state)['isLoggedIn']
const getLoginError = state => getState(state)['loginError']

export const selectors = {
  getState,
  getIsLoggedIn,
  getLoginError,
}
