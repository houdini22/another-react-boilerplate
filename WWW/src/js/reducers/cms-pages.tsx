import { http } from '../modules/http'

const SET_IS_LOADING = 'cms-pages::set-is-loading'
const SET_IS_LOADED = 'cms-pages::set-is-loaded'
const SET_FETCH_ERROR = 'cms-pages::set-fetch-error'
const SET_CURRENT_ID = 'cms-pages::set-current-id'
const SET_NODES = 'cms-pages::set-nodes'
const SET_CURRENT_NODE = 'cms-pages::set-current-node'

const setIsLoading = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: data })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const setNodes = (data) => (dispatch) => {
    dispatch({ type: SET_NODES, payload: data })
}

const setCurrentNode = (data) => (dispatch) => {
    dispatch({ type: SET_CURRENT_NODE, payload: data })
}

const setCurrentId = (currentId) => (dispatch) => {
    dispatch({ type: SET_CURRENT_ID, payload: currentId })
    dispatch(fetch(currentId))
}

const fetch =
    (parent_id = 0) =>
    (dispatch) => {
        return new Promise((resolve) => {
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get('/cms/pages', {
                params: {
                    parent_id,
                },
            })
                .then(({ data: { nodes, currentNode } }) => {
                    dispatch(setNodes(nodes))
                    dispatch(setCurrentNode(currentNode))
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                })
                .catch((e) => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                })
        })
    }

const fetchParentCategorySelectOptions = () => (dispatch) => {
    return new Promise((resolve) => {
        http.get('/cms/pages/fetchParentCategorySelectOptions')
            .then(({ data: { options } }) => {
                resolve(options)
            })
            .catch((e) => {})
    })
}

const fetchIndexDocumentsSelectOptions = () => (dispatch) => {
    return new Promise((resolve) => {
        http.get('/cms/pages/fetchIndexDocumentsSelectOptions')
            .then(({ data: { options } }) => {
                resolve(options)
            })
            .catch((e) => {})
    })
}

const addCategory = (values) => (dispatch) => {
    return http.post('/cms/pages/addCategory', values)
}

const addDocument = (values) => (dispatch) => {
    return http.post('/cms/pages/addDocument', values)
}

export const actions = {
    fetch,
    setIsLoaded,
    setIsLoading,
    setFetchError,
    setCurrentId,
    setCurrentNode,
    fetchParentCategorySelectOptions,
    fetchIndexDocumentsSelectOptions,
    addCategory,
    addDocument,
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
    [SET_IS_LOADED]: (state, { payload }) => {
        return {
            ...state,
            isLoaded: payload,
        }
    },
    [SET_FETCH_ERROR]: (state, { payload }) => {
        return {
            ...state,
            fetchError: payload,
        }
    },
    [SET_CURRENT_ID]: (state, { payload }) => {
        return {
            ...state,
            currentId: payload,
        }
    },
    [SET_NODES]: (state, { payload }) => {
        return {
            ...state,
            nodes: payload,
        }
    },
    [SET_CURRENT_NODE]: (state, { payload }) => {
        return {
            ...state,
            currentNode: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    nodes: [],
    isLoading: false,
    isLoaded: false,
    fetchError: null,
    currentId: undefined,
    currentNode: {},
})

export default function cmsPagesReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['cmsPages']
const getNodes = (state) => getState(state)['nodes']
const getIsLoading = (state) => getState(state)['isLoading']
const getIsLoaded = (state) => getState(state)['isLoaded']
const getFetchError = (state) => getState(state)['fetchError']
const getCurrentId = (state) => getState(state)['currentId']
const getCurrentNode = (state) => getState(state)['currentNode']

export const selectors = {
    getState,
    getNodes,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getCurrentId,
    getCurrentNode,
}
