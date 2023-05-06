import * as React from 'react'

// constants
export const CONNECTION_ERROR_MODAL_VISIBLE = 'common::connection_error_modal_visible'
export const SET_LAYOUT_OPTION = 'common::set-layout-option'
export const SET_FETCH_ERROR = 'common::set-fetch-error'
export const SET_404_ERROR = 'common::set-404-error'

// actions

const setConnectionErrorModalVisible = (payload) => (dispatch) => {
    dispatch({ type: CONNECTION_ERROR_MODAL_VISIBLE, payload: payload })
}

const setLayoutOption = (name, value) => (dispatch) => {
    dispatch({ type: SET_LAYOUT_OPTION, payload: { name, value } })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const set404error = (data) => (dispatch) => {
    dispatch({ type: SET_404_ERROR, payload: data })
}

export const actions = {
    setConnectionErrorModalVisible,
    setLayoutOption,
    setFetchError,
    set404error,
}

// action handlers

const ACTION_HANDLERS = {
    [CONNECTION_ERROR_MODAL_VISIBLE]: (state, { payload }) => {
        return {
            ...state,
            connectionErrorModalVisible: payload,
        }
    },
    [SET_LAYOUT_OPTION]: (state, { payload: { name, value } }) => {
        return {
            ...state,
            layout: {
                ...state['layout'],
                [name]: value,
            },
        }
    },
    [SET_FETCH_ERROR]: (state, { payload }) => {
        return {
            ...state,
            layout: {
                ...state['layout'],
            },
            connectionFetchError: payload,
        }
    },
    [SET_404_ERROR]: (state, { payload }) => {
        return {
            ...state,
            error404: payload,
        }
    },
}

// reducers

const initialState = {
    connectionErrorModalVisible: {},
    connectionFetchError: {},
    layout: {
        disableHeader: false,
        disableFooter: false,
        disableSidebar: false,
        floatingSidebar: false,
        sidebarExpanded: false,
    },
    error404: {},
}

export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['common']
const getIsConnectionErrorModalVisible = (state) => getState(state)['connectionErrorModalVisible']
const getConnectionFetchError = (state) => getState(state)['connectionFetchError']
const getLayout = (state) => getState(state)['layout']
const get404error = (state) => getState(state)['error404']

export const selectors = {
    getState,
    getIsConnectionErrorModalVisible,
    getLayout,
    getConnectionFetchError,
    get404error,
}
