import { http, myGet, myPost } from '../modules/http'

const SET_IS_LOADING = 'cms-pages::set-is-loading'
const SET_FETCH_ERROR = 'cms-pages::set-fetch-error'
const SET_CURRENT_ID = 'cms-pages::set-current-id'
const SET_NODES = 'cms-pages::set-nodes'
const SET_CURRENT_NODE = 'cms-pages::set-current-node'
const SET_CURRENT_NODE_PARENTS = 'cms-pages::set-current-node-parents'
const SET_MENUS = 'cms-pages::set-menus'
const SET_MENU = 'cms-pages::set-menu'
const ADD_NEW_MENU_LINK = 'cms-pages::add-new-menu-link'
const REMOVE_NEW_MENU_LINK = 'cms-pages::remove-new-menu-link'
const CLEAR_NEW_MENU_LINKS = 'cms-pages::clear-new-menu-links'

const setIsLoading = (data) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_IS_LOADING, payload: data })
        resolve()
    })
}

const setNodes = (data) => (dispatch) => {
    dispatch({ type: SET_NODES, payload: data })
}

const setCurrentNode = (data) => (dispatch) => {
    dispatch({ type: SET_CURRENT_NODE, payload: data })
}

const setCurrentNodeParents = (data) => (dispatch) => {
    dispatch({ type: SET_CURRENT_NODE_PARENTS, payload: data })
}

const addNewMenuLink = (data) => (dispatch) => {
    dispatch({ type: ADD_NEW_MENU_LINK, payload: data })
}

const clearNewMenuLinks = () => (dispatch) => {
    dispatch({ type: CLEAR_NEW_MENU_LINKS })
}

const setCurrentId = (currentId) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_CURRENT_ID, payload: currentId })
        resolve()
    })
}

const removeNewMenuLink = (link) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: REMOVE_NEW_MENU_LINK, payload: link })
        resolve()
    })
}

const setMenus = (menus) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_MENUS, payload: menus })
        resolve()
    })
}


const setMenu = (menu) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_MENU, payload: menu })
        resolve()
    })
}

const fetch = (filters) => (dispatch, state) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .get('/cms/pages', {
                params: {
                    parent_id: getCurrentId(state()),
                    filters,
                },
            })
            .then(
                ({
                    data: {
                        data: {
                            data: { nodes, currentNode, parents },
                        },
                    },
                }) => {
                    dispatch(setNodes(nodes))
                    dispatch(setCurrentNode(currentNode))
                    dispatch(setCurrentNodeParents(parents))
                    resolve()
                },
            )
            .catch(() => {
                reject()
            })
    })
}

const fetchMenus = (filters) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        return myGet('/cms/menus', {
            filters,
        })
            .then((data) => {
                dispatch(setMenus(data))
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

const fetchMenu = (id) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        return myGet('/cms/menu/', {
            id,
        })
            .then((data) => {
                dispatch(setMenu(data))
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

const fetchParentCategorySelectOptions = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        http.get('/cms/pages/fetchParentCategorySelectOptions')
            .then(
                ({
                    data: {
                        data: {
                            data: { data },
                        },
                    },
                }) => {
                    resolve(data)
                },
            )
            .catch((e) => {
                reject()
            })
    })
}

const fetchIndexDocumentsSelectOptions = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        http.get('/cms/pages/fetchIndexDocumentsSelectOptions')
            .then(
                ({
                    data: {
                        data: {
                            data: { data },
                        },
                    },
                }) => {
                    resolve(data)
                },
            )
            .catch((e) => {
                reject()
            })
    })
}

const addCategory = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/addCategory', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => {
                reject(e)
            })
    })
}

const editCategory = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/editCategory', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => {
                reject(e)
            })
    })
}

const addDocument = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/addDocument', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => reject(e))
    })
}

const editDocument = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/editDocument', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => reject(e))
    })
}

const addLink = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/addLink', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => {
                reject(e)
            })
    })
}

const addMenu = (menu, links) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        return myPost('/cms/menus/add', {
            menu,
            links,
        })
            .then((data) => {
                resolve(data)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const editMenu = (menu, links) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        return myPost('/cms/menus/edit', {
            menu,
            links,
        })
            .then((data) => {
                resolve(data)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const editLink = (values) => (dispatch, getState) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/cms/pages/editLink', values)
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    return dispatch(fetch(getCurrentNode(getState())['id'])).then(() => {
                        resolve(data)
                    })
                },
            )
            .catch((e) => {
                reject(e)
            })
    })
}

const publish = (id) => (dispatch, getState) => {
    return http.post('/cms/pages/publish', { id }).then(() => {
        dispatch(fetch(getCurrentNode(getState())['id']))
    })
}

const unpublish = (id) => (dispatch, getState) => {
    return http.post('/cms/pages/unpublish', { id }).then(() => {
        dispatch(fetch(getCurrentNode(getState())['id']))
    })
}

const deleteNode =
    ({ id }) =>
    (dispatch, getState) => {
        return http.delete('/cms/pages/deleteNode', { params: { id } }).then(() => {
            dispatch(fetch(getCurrentNode(getState())['id']))
        })
    }

export const actions = {
    fetch,
    setIsLoading,
    setCurrentId,
    setCurrentNode,
    fetchParentCategorySelectOptions,
    fetchIndexDocumentsSelectOptions,
    addCategory,
    addDocument,
    publish,
    unpublish,
    deleteNode,
    addLink,
    editCategory,
    editDocument,
    editLink,
    fetchMenus,
    addNewMenuLink,
    removeNewMenuLink,
    addMenu,
    editMenu,
    clearNewMenuLinks,
    fetchMenu,
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
    [SET_CURRENT_NODE_PARENTS]: (state, { payload }) => {
        return {
            ...state,
            currentNodeParents: payload,
        }
    },
    [SET_MENUS]: (state, { payload }) => {
        return {
            ...state,
            menus: payload,
        }
    },
    [SET_MENU]: (state, { payload }) => {
        return {
            ...state,
            menu: payload,
        }
    },
    [ADD_NEW_MENU_LINK]: (state, { payload }) => {
        return {
            ...state,
            newMenuLinks: [...state.newMenuLinks, payload],
        }
    },
    [REMOVE_NEW_MENU_LINK]: (state, { payload }) => {
        return {
            ...state,
            newMenuLinks: state.newMenuLinks.filter((link) => {
                return link.link.link_name !== payload.link.link_name
            }),
        }
    },
    [CLEAR_NEW_MENU_LINKS]: (state) => {
        return {
            ...state,
            newMenuLinks: [],
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    nodes: [],
    isLoading: false,
    currentId: undefined,
    currentNode: {},
    currentNodeParents: [],
    menus: [],
    newMenuLinks: [],
    menu: {},
})

export default function cmsPagesReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['cmsPages']
const getNodes = (state) => getState(state)['nodes']
const getIsLoading = (state) => getState(state)['isLoading']
const getCurrentId = (state) => getState(state)['currentId']
const getCurrentNode = (state) => getState(state)['currentNode']
const getCurrentNodeParents = (state) => getState(state)['currentNodeParents']
const getMenus = (state) => getState(state)['menus']
const getMenu = (state) => getState(state)['menu']
const getNewMenuLinks = (state) => getState(state)['newMenuLinks']

export const selectors = {
    getState,
    getNodes,
    getIsLoading,
    getCurrentId,
    getCurrentNode,
    getCurrentNodeParents,
    getMenus,
    getMenu,
    getNewMenuLinks,
}
