import { http } from '../modules/http'

const SET_IS_LOADING = 'users::set-is-loading'
const SET_IS_LOADED = 'users::set-is-loaded'
const SET_FETCH_ERROR = 'users::set-fetch-error'
const SET_USERS = 'users::set-users'
const SET_USER = 'users::set-user'
const SET_UPLOAD_PROGRESS = 'users::set-upload-progress'

const setIsLoading = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: data })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const setUsers = (data) => (dispatch) => {
    dispatch({ type: SET_USERS, payload: data })
}

const setUser = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

const setUploadProgress = (data) => (dispatch) => {
    dispatch({ type: SET_UPLOAD_PROGRESS, payload: data })
}

const fetch = () => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))
        dispatch(setUsers([]))

        http.get('/users/list')
            .then(({ data: { users } }) => {
                dispatch(setUsers(users))
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

const addUser = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoading(true))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        return http
            .post('/users/add', params)
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
export const actions = {
    fetch,
    fetchOne,
    setIsLoaded,
    setIsLoading,
    setFetchError,
    setUsers,
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
    [SET_USERS]: (state, { payload }) => {
        return {
            ...state,
            users: payload,
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
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    users: [],
    user: {},
    isLoading: false,
    isLoaded: false,
    fetchError: null,
    uploadProgress: -1,
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
