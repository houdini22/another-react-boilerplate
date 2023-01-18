import * as React from 'react'
import { MovieInterface } from '../routes/Index/containers/MoviesContainer'

// constants
export const CONNECTION_ERROR_MODAL_VISIBLE =
    'common::connection_error_modal_visible'
export const SET_SEARCH_FIELD_FOCUSED = 'common::set_search_field_focused'
export const SET_SEARCH_PHRASE = 'common::set_search_phrase'
export const SET_MOVIES = 'common::set_movies'
export const SET_IS_LOADING = 'common::set_is_loading'

// actions

const setConnectionErrorModalVisible = (value) => (dispatch) => {
    dispatch({ type: CONNECTION_ERROR_MODAL_VISIBLE, payload: value })
}
const setSearchFieldFocused = (value) => (dispatch) => {
    dispatch({ type: SET_SEARCH_FIELD_FOCUSED, payload: value })
}
const setSearchPhrase = (value) => (dispatch) => {
    dispatch({ type: SET_SEARCH_PHRASE, payload: value })
}
const setMovies = (value) => (dispatch) => {
    dispatch({ type: SET_MOVIES, payload: value })
}
const setIsLoading = (value) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: value })
}

export const actions = {
    setConnectionErrorModalVisible,
    setSearchFieldFocused,
    setSearchPhrase,
    setMovies,
    setIsLoading,
}

// action handlers

const ACTION_HANDLERS = {
    [CONNECTION_ERROR_MODAL_VISIBLE]: (
        state,
        { payload: connectionErrorModalVisible },
    ) => {
        return {
            ...state,
            connectionErrorModalVisible,
        }
    },
    [SET_SEARCH_FIELD_FOCUSED]: (state, { payload: searchFieldFocused }) => {
        return {
            ...state,
            searchFieldFocused,
        }
    },
    [SET_SEARCH_PHRASE]: (state, { payload: searchPhrase }) => {
        return {
            ...state,
            searchPhrase,
        }
    },
    [SET_MOVIES]: (state, { payload: movies }) => {
        return {
            ...state,
            movies,
        }
    },
    [SET_IS_LOADING]: (state, { payload: isLoading }) => {
        return {
            ...state,
            isLoading,
        }
    },
}

// reducers

export interface CommonStateInterface {
    connectionErrorModalVisible: boolean
    searchFieldFocused: boolean
    searchPhrase: string
    movies: Array<MovieInterface>
    isLoading: boolean
}

const initialState: CommonStateInterface = {
    connectionErrorModalVisible: false,
    searchFieldFocused: false,
    searchPhrase: '',
    movies: [],
    isLoading: true,
}

export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['common']
const getIsConnectionErrorModalVisible = (state) =>
    getState(state)['connectionErrorModalVisible']
const getMovies = (state) => {
    const _state = getState(state)
    if (_state.searchPhrase.length >= 3) {
        return _state.movies.filter(({ title }) => {
            return title.match(new RegExp(_state.searchPhrase, 'gi'))
        })
    }
    return _state.movies
}

export const selectors = {
    getState,
    getIsConnectionErrorModalVisible,
    getMovies,
}
