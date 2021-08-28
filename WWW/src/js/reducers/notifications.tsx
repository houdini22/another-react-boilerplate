// ------------------------------------
// Constants
// ------------------------------------
export const ADD_NOTIFICATION = 'notifications::add-notification'
export const RESET_UNREAD = 'notifications::reset-unread'
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
})

export default function notificationReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['notifications']
const getNotifications = (state) => getState(state)['notifications'].reverse()
const getUnreadNotifications = (state) => getState(state)['unread']

export const selectors = {
    getState,
    getNotifications,
    getUnreadNotifications,
}
