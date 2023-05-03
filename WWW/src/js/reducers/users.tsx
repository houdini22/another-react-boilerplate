import { http } from '../modules/http'

import { actions as rolesActions } from './roles'
const { addUserPermission } = rolesActions

const SET_IS_LOADING = 'users::set-is-loading'
const SET_IS_LOADED = 'users::set-is-loaded'
const SET_FETCH_ERROR = 'users::set-fetch-error'
const SET_USER = 'users::set-user'
const SET_UPLOAD_PROGRESS = 'users::set-upload-progress'
const ADD_ROLE_TO_NEW_USER = 'users::add-role-to-new-user'
const REMOVE_ROLE_FROM_NEW_USER = 'users::remove-role-from-new-user'
const CLEAR_NEW_USER_ROLES = 'users::clear-new-user-roles'
const ADD_PERMISSION_TO_NEW_USER = 'users::add-permission-to-new-user'
const REMOVE_PERMISSION_FROM_NEW_USER = 'users::add-permission-to-new-user'
const CLEAR_NEW_USER_PERMISSIONS = 'users::clear-new-user-permissions'

const setIsLoading = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: data })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const setUser = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

const setUploadProgress = (data) => (dispatch) => {
    dispatch({ type: SET_UPLOAD_PROGRESS, payload: data })
}
const editUser = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.put('/users/edit', params)
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

const deleteAvatar = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.post(`/users/delete_avatar`, user)
            .then(({ data }) => {
                dispatch(setIsLoaded(true))
                resolve()
            })
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const addUser = (params) => (dispatch, state) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        return http
            .post('/users/add', params)
            .then(({ data: { user } }) => {
                const {
                    users: { newUserRoles, newUserPermissions },
                } = state()
                const promises = []

                newUserRoles.forEach((id) => {
                    promises.push(dispatch(addUserRole({ id: user.id }, { id })))
                })
                newUserPermissions.forEach((id) => {
                    promises.push(dispatch(addUserPermission({ id: user.id }, { id })))
                })

                Promise.all(promises).then(() => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                    dispatch(clearNewUserRoles())
                    dispatch(clearNewUserPermissions())

                    resolve(user)
                })
            })
            .catch((e) => {
                dispatch(setIsLoading(false))
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const fetchOne =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve) => {
            dispatch(setUser({}))
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get(`/users/get/${id}`)
                .then(({ data: { user } }) => {
                    dispatch(setUser(user))
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

const deleteUser = (id) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.delete(`/users/delete/${id}`)
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

const deleteUserRole =
    ({ id: user_id }, { id: role_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.delete(`/users/roles/delete/${user_id}/${role_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const addUserRole =
    ({ id: user_id }, { id: role_id = 0 } = {}) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.post(`/users/roles/add/${user_id}/${role_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const sendActivationEmail =
    ({ id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.post(`/users/send_activation_email`, {
                id,
            })
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const sendAvatar =
    ({ id }, file) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            const formData = new FormData()
            formData.append('avatar', file)

            const onUploadProgress = (progressEvent) => {
                const { loaded, total } = progressEvent
                let percent = Math.floor((loaded * 100) / total)
                if (percent <= 100) {
                    dispatch(setUploadProgress(percent))
                }
            }

            http.post(`/users/change_avatar/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            })
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }
const forceLogin =
    ({ id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.post(`/users/force_login/${id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }
const activateUser = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setFetchError(null))

        http.post(`/users/activate/${user.id}`, { user })
            .then(({ data: { user } }) => {
                resolve()
            })
            .catch((e) => {
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}
const deactivateUser = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setFetchError(null))

        http.post(`/users/deactivate/${user.id}`, { user })
            .then(({ data: { user } }) => {
                resolve()
            })
            .catch((e) => {
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}
const addRoleToNewUser = (role) => (dispatch) => {
    dispatch({ type: ADD_ROLE_TO_NEW_USER, payload: role })
}
const removeRoleFromNewUser = (role) => (dispatch) => {
    dispatch({ type: REMOVE_ROLE_FROM_NEW_USER, payload: role })
}
const addPermissionToNewUser = (permission) => (dispatch) => {
    dispatch({ type: ADD_PERMISSION_TO_NEW_USER, payload: permission })
}
const removePermissionFromNewUser = (permission) => (dispatch) => {
    dispatch({ type: REMOVE_PERMISSION_FROM_NEW_USER, payload: permission })
}
const clearNewUserRoles = () => (dispatch) => {
    dispatch({ type: CLEAR_NEW_USER_ROLES })
}
const clearNewUserPermissions = () => (dispatch) => {
    dispatch({ type: CLEAR_NEW_USER_PERMISSIONS })
}
export const actions = {
    fetch,
    fetchOne,
    setIsLoaded,
    setIsLoading,
    setFetchError,
    editUser,
    addUser,
    deleteUser,
    deleteUserRole,
    addUserRole,
    sendActivationEmail,
    sendAvatar,
    forceLogin,
    setUploadProgress,
    activateUser,
    deactivateUser,
    addRoleToNewUser,
    removeRoleFromNewUser,
    addPermissionToNewUser,
    removePermissionFromNewUser,
    deleteAvatar,
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
    [SET_USER]: (state, { payload }) => {
        return {
            ...state,
            user: payload,
        }
    },
    [SET_UPLOAD_PROGRESS]: (state, { payload }) => {
        return {
            ...state,
            uploadProgress: payload,
        }
    },
    [ADD_ROLE_TO_NEW_USER]: (state, { payload }) => {
        return {
            ...state,
            newUserRoles: [...state.newUserRoles, payload],
        }
    },
    [REMOVE_ROLE_FROM_NEW_USER]: (state, { payload }) => {
        return {
            ...state,
            newUserRoles: state.newUserRoles.filter((role) => {
                return role !== payload
            }),
        }
    },
    [ADD_PERMISSION_TO_NEW_USER]: (state, { payload }) => {
        return {
            ...state,
            newUserPermissions: [...state.newUserPermissions, payload],
        }
    },
    [REMOVE_PERMISSION_FROM_NEW_USER]: (state, { payload }) => {
        return {
            ...state,
            newUserPermissions: state.newUserPermissions.filter((role) => {
                return role !== payload
            }),
        }
    },
    [CLEAR_NEW_USER_ROLES]: (state) => {
        return {
            ...state,
            newUserRoles: [],
        }
    },
    [CLEAR_NEW_USER_PERMISSIONS]: (state) => {
        return {
            ...state,
            newUserPermissions: [],
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    user: {},
    isLoading: false,
    isLoaded: false,
    fetchError: null,
    uploadProgress: -1,
    newUserRoles: [],
    newUserPermissions: [],
})

export default function cmsPagesReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['users']
const getUsers = (state) => getState(state)['users']
const getUser = (state) => getState(state)['user']
const getIsLoading = (state) => getState(state)['isLoading']
const getIsLoaded = (state) => getState(state)['isLoaded']
const getFetchError = (state) => getState(state)['fetchError']
const getUploadProgress = (state) => getState(state)['uploadProgress']
export const selectors = {
    getState,
    getUsers,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getUser,
    getUploadProgress,
}
