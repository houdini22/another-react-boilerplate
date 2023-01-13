// ------------------------------------
// Constants
// ------------------------------------
export const SET_CONTACT_FORM_IS_LOADING =
    'contact-form::set-contact-form-is-loading'
export const SET_CONTACT_FORM_MESSAGE = 'contact-form::set-contact-form-message'
export const RESET_CONTACT_FORM_CAPTCHA =
    'contact-form::reset-contact-form-captcha'
// ------------------------------------
// Actions
// ------------------------------------
const setContactFormIsLoading = (isLoading) => (dispatch) => {
    dispatch({
        type: SET_CONTACT_FORM_IS_LOADING,
        payload: isLoading,
    })
}
const resetContactFormCaptcha = (isLoading) => (dispatch) => {
    dispatch({
        type: RESET_CONTACT_FORM_CAPTCHA,
        payload: isLoading,
    })
}

const setContactFormMessage = (message) => (dispatch) => {
    dispatch({
        type: SET_CONTACT_FORM_MESSAGE,
        payload: message,
    })
}

export const actions = {
    setContactFormIsLoading,
    setContactFormMessage,
    resetContactFormCaptcha,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_CONTACT_FORM_IS_LOADING]: (state, { payload: isLoading }) => {
        return {
            ...state,
            isLoading,
        }
    },
    [SET_CONTACT_FORM_MESSAGE]: (state, { payload: message }) => {
        return {
            ...state,
            message,
        }
    },
    [RESET_CONTACT_FORM_CAPTCHA]: (state) => {
        return {
            ...state,
            captcha: Math.random(),
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoading: false,
    message: {},
    captcha: Math.random(),
})

export default function contactFormReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['contactform']
const getContactFormIsLoading = (state) => getState(state)['isLoading']
const getContactFormMessage = (state) => getState(state)['message']
const getContactFormCaptcha = (state) => getState(state)['captcha']

export const selectors = {
    getState,
    getContactFormIsLoading,
    getContactFormMessage,
    getContactFormCaptcha,
}
