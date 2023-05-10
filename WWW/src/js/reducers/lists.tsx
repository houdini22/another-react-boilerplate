import * as React from 'react'

// constants
export const SET_LIST = 'list::set-list'
export const SET_FILTERS_DATA = 'list::set-filters-data'
export const SET_PAGE = 'list::set-page'
// actions

const setListData =
    (name, data = {}) =>
    (dispatch) => {
        dispatch({ type: SET_LIST, payload: { name, data } })
    }
const setFiltersData =
    (name, data = {}) =>
    (dispatch) => {
        dispatch({ type: SET_FILTERS_DATA, payload: { name, data } })
    }
const setPage = (name, page) => (dispatch) => {
    dispatch({ type: SET_PAGE, payload: { name, page } })
}

export const actions = {
    setListData,
    setFiltersData,
    setPage,
}

// action handlers

const ACTION_HANDLERS = {
    [SET_LIST]: (state, { payload: { name, data } }) => {
        const list = state.lists?.[name] || {}

        return {
            ...state,
            lists: {
                ...state.lists,
                [name]: {
                    ...list,
                    ...{
                        ...data,
                        ...{
                            hasPrevPage: !!data?.prev_page_url,
                            hasNextPage: !!data?.next_page_url,
                            perPage: data?.per_page,
                            totalPages: data?.last_page,
                        },
                    },
                },
            },
        }
    },
    [SET_FILTERS_DATA]: (state, { payload: { name, data } }) => {
        return {
            ...state,
            filtersData: {
                ...state.filtersData,
                [name]: data,
            },
        }
    },
    [SET_PAGE]: (state, { payload: { name, page } }) => {
        const list = state.lists?.[name] || {}

        return {
            ...state,
            lists: {
                ...state.lists,
                [name]: {
                    ...list,
                    page,
                },
            },
        }
    },
}

// reducers

const initialState = {
    filtersData: {},
    lists: {},
}

export default function listsReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['lists']
const getListData = (state, name) => getState(state)['lists'][name]
const getFiltersData = (state, name) => getState(state)['filtersData'][name]
const getPage = (state, name) => getState(state)['lists']?.[name]?.['page']
export const selectors = {
    getState,
    getListData,
    getFiltersData,
    getPage,
}
