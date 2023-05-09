const SET_IS_LOADING = 'logs::set-is-loading'

const setIsLoading = (data) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_IS_LOADING, payload: data })
        resolve()
    })
}

export const actions = {
    setIsLoading,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_IS_LOADING]: (state, { payload }) => {
        return {
            ...state,
            isLoading: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoading: false,
})

export default function logsReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['logs']
const getIsLoading = (state) => getState(state)['isLoading']
export const selectors = {
    getState,
    getIsLoading,
}
