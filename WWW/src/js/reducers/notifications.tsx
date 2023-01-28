import md5 from 'md5'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_NOTIFICATION = 'notifications::add-notification'
export const RESET_UNREAD = 'notifications::reset-unread'
export const ADD_TOAST_NOTIFICATION = 'notifications::add-toast-notification'
export const REMOVE_TOAST_NOTIFICATION =
    'notifications::remove-toast-notification'
// ------------------------------------
// Actions
// ------------------------------------
const addNotification =
    ({ type, text, href, title }) =>
    (dispatch) => {
        dispatch({
            type: ADD_NOTIFICATION,
            payload: {
                type,
                text,
                href,
                title,
            },
        })
        dispatch(addToastNotification({ type, text, href, title }))
    }
const addToastNotification =
    ({ type, text, href, title }) =>
    (dispatch) => {
        const id = md5(`${type}${text}${href}${title}${Math.random()}`)

        dispatch({
            type: ADD_TOAST_NOTIFICATION,
            payload: {
                type,
                text,
                href,
                title,
                id,
            },
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_TOAST_NOTIFICATION,
                payload: {
                    id,
                },
            })
        }, 5000)
    }
const resetUnreadNotifications = () => (dispatch) => {
    dispatch({
        type: RESET_UNREAD,
        payload: null,
    })
}
export const actions = {
    addNotification,
    resetUnreadNotifications,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_NOTIFICATION]: (state, { payload: { type, text, href, title } }) => {
        return {
            ...state,
            unread: state.unread + 1,
            notifications: [
                ...state.notifications,
                {
                    type,
                    text,
                    href,
                    title,
                },
            ],
        }
    },
    [ADD_TOAST_NOTIFICATION]: (
        state,
        { payload: { type, text, href, title, id } },
    ) => {
        return {
            ...state,
            unread: state.unread + 1,
            toastNotifications: [
                ...state.toastNotifications,
                {
                    type,
                    text,
                    href,
                    title,
                    id,
                },
            ],
        }
    },
    [REMOVE_TOAST_NOTIFICATION]: (state, { payload: { id: _id } }) => {
        const toastNotifications = state.toastNotifications
        const index = toastNotifications.findIndex(({ id }) => id === _id)
        toastNotifications.splice(index, 1)
        return {
            ...state,
            unread: state.unread + 1,
            toastNotifications: [...toastNotifications],
        }
    },
    [RESET_UNREAD]: (state) => {
        return {
            ...state,
            unread: 0,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    notifications: [],
    unread: 0,
    toastNotifications: [],
})

export default function notificationReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['notifications']
const getNotifications = (state) => getState(state)['notifications'].reverse()
const getUnreadNotifications = (state) => getState(state)['unread']
const getToastNotifications = (state) => getState(state)['toastNotifications']
export const selectors = {
    getState,
    getNotifications,
    getUnreadNotifications,
    getToastNotifications,
}

export interface ToastNotification {
    id: string
    href: string
    type: string
    text: string
    title: string
}
