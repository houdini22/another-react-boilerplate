import { http } from '../modules/http'

const SET_IS_LOADING = 'roles::set-is-loading'
const SET_IS_LOADED = 'roles::set-is-loaded'
const SET_FETCH_ERROR = 'roles::set-fetch-error'
const SET_ROLES = 'roles::set-roles'
const SET_ROLE = 'roles::set-role'
const SET_PERMISSIONS = 'roles::set-permissions'

const setIsLoading = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: data })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const setRoles = (data) => (dispatch) => {
    dispatch({ type: SET_ROLES, payload: data })
}

const setRole = (data) => (dispatch) => {
    dispatch({ type: SET_ROLE, payload: data })
}

const setPermissions = (data) => (dispatch) => {
    dispatch({ type: SET_PERMISSIONS, payload: data })
}

const fetch = () => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))
        dispatch(setRoles([]))

        http.get('/roles/list')
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    dispatch(setRoles(data))
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                    resolve()
                },
            )
            .catch((e) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
            })
    })
}

const fetchPermissions = () => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))
        dispatch(setPermissions([]))

        http.get('/roles/permissions/list')
            .then(({ data: { permissions } }) => {
                dispatch(setPermissions(permissions))
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(true))
                resolve()
            })
            .catch((e) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
            })
    })
}

const editRole = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.post('/roles/edit', params)
            .then(({ data }) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(true))
                resolve()
            })
            .catch((e) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const addRole = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        return http
            .post('/roles/add', params)
            .then(({ data }) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(true))
                resolve()
            })
            .catch((e) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const addPermission = (role, params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setFetchError(null))

        return http
            .post(`/roles/permissions/${role.id}/add`, params)
            .then(({ data }) => {
                resolve()
            })
            .catch((e) => {
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const fetchOne =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve) => {
            dispatch(setRole({}))
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get(`/roles/get/${id}`)
                .then(({ data: { role } }) => {
                    dispatch(setRole(role))
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                })
        })
    }

const deleteRole =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.delete(`/roles/delete/${id}`)
                .then(({ data: { user } }) => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const deleteUserPermission =
    ({ id: role_id }, { id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.delete(`/roles/permissions/delete/${role_id}/${permission_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const deletePermission =
    ({ id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.delete(`/roles/permissions/delete/${permission_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }
export const actions = {
    fetch,
    fetchOne,
    setIsLoaded,
    setIsLoading,
    setFetchError,
    setRoles,
    editRole,
    addRole,
    deleteRole,
    addPermission,
    fetchPermissions,
    deleteUserPermission,
    deletePermission,
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
    [SET_ROLES]: (state, { payload }) => {
        return {
            ...state,
            roles: payload,
        }
    },
    [SET_ROLE]: (state, { payload }) => {
        return {
            ...state,
            role: payload,
        }
    },
    [SET_PERMISSIONS]: (state, { payload }) => {
        return {
            ...state,
            permissions: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    roles: [],
    role: {},
    isLoading: false,
    isLoaded: false,
    fetchError: null,
    permissions: [],
})

export default function cmsPagesReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['roles']
const getRoles = (state) => getState(state)['roles']
const getRole = (state) => getState(state)['role']
const getIsLoading = (state) => getState(state)['isLoading']
const getIsLoaded = (state) => getState(state)['isLoaded']
const getFetchError = (state) => getState(state)['fetchError']
const getPermissions = (state) => getState(state)['permissions']
export const selectors = {
    getState,
    getRoles,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getRole,
    getPermissions,
}
