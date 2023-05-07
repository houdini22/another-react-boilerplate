import * as React from 'react'

// constants
export const SET_FILTER = 'filters::set-filter'
export const SET_FILTERS = 'filters::set-filters'

// actions

const setFilter = (containerName, name, value) => (dispatch) => {
    dispatch({ type: SET_FILTER, payload: { containerName, name, value } })
}

const setFilters = (containerName, filters) => (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: { containerName, filters } })
}
export const actions = {
    setFilter,
    setFilters,
}

// action handlers

const ACTION_HANDLERS = {
    [SET_FILTER]: (state, { payload: { containerName, name, value } }) => {
        return {
            ...state,
            filters: {
                ...state.filters,
                [containerName]: {
                    ...state.filters[containerName],
                    [name]: value,
                },
            },
        }
    },
    [SET_FILTERS]: (state, { payload: { containerName, filters } }) => {
        return {
            ...state,
            filters: {
                ...state.filters,
                [containerName]: filters,
            },
        }
    },
}

// reducers

const initialState = {
    filters: {},
}

export default function filterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['filters']
const getFilters = (state) => getState(state).filters
export const selectors = {
    getState,
    getFilters,
}
