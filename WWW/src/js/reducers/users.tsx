import { http } from '../modules/http'

const SET_IS_LOADING = 'users::set-is-loading'
const SET_IS_LOADED = 'users::set-is-loaded'
const SET_FETCH_ERROR = 'users::set-fetch-error'
const SET_USER = 'users::set-user'
const SET_USERS = 'users::set-users'
const SET_UPLOAD_PROGRESS = 'users::set-upload-progress'
const SET_PERMISSIONS = 'users::set-permissions'
const SET_PERMISSION = 'users::set-permission'
const SET_ROLES = 'users::set-roles'
const SET_ROLE = 'users::set-role'

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

const setUsers = (data) => (dispatch) => {
    dispatch({ type: SET_USERS, payload: data })
}

const setPermissions = (data) => (dispatch) => {
    dispatch({ type: SET_PERMISSIONS, payload: data })
}

const setPermission = (data) => (dispatch) => {
    dispatch({ type: SET_PERMISSION, payload: data })
}

const setUploadProgress = (data) => (dispatch) => {
    dispatch({ type: SET_UPLOAD_PROGRESS, payload: data })
}

const setRoles = (data) => (dispatch) => {
    dispatch({ type: SET_ROLES, payload: data })
}

const setRole = (data) => (dispatch) => {
    dispatch({ type: SET_ROLE, payload: data })
}

const editUser = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.put('/users/edit', params)
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

const addUserPermission =
    ({ id: user_id }, { id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.post(`/permissions/add/${user_id}/${permission_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const addUser = (params, newUserRoles, newUserPermissions) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        return http
            .post('/users/add', params)
            .then(({ data: { user } }) => {
                const promises = []

                newUserRoles.forEach(({ id }) => {
                    promises.push(dispatch(addUserRole({ id: user.id }, { id })))
                })
                newUserPermissions.forEach(({ id }) => {
                    promises.push(dispatch(addUserPermission({ id: user.id }, { id })))
                })

                Promise.all(promises).then(() => {
                    dispatch(setIsLoaded(true))
                    resolve(user)
                })
            })
            .catch((e) => {
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
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get(`/users/get/${id}`)
                .then(({ data: { user } }) => {
                    dispatch(setUser(user))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                })
        })
    }

const fetch = () => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch(setUser({}))
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.get(`/users/list`)
            .then(
                ({
                    data: {
                        data: { data: users },
                    },
                }) => {
                    dispatch(setUsers(users))
                    dispatch(setIsLoaded(true))
                    resolve()
                },
            )
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
            })
    })
}

const deleteUser = (id) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.delete(`/users/delete/${id}`)
            .then(({ data: { user } }) => {
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

const deleteUserRole =
    ({ id: user_id }, { id: role_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.delete(`/roles/permissions/delete_user_role/${user_id}/${role_id}`)
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

const editRole = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.post('/roles/edit', params)
            .then(({}) => {
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

const addRole = (params, rolePermissions, roleUsers) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        return http
            .post('/roles/add', params)
            .then(({ data: { role } }) => {
                dispatch(setIsLoaded(true))

                const promises = []

                rolePermissions.forEach((permission) => {
                    promises.push(dispatch(addPermission({ permission: permission.id, role_id: role.id })))
                })

                roleUsers.forEach((user) => {
                    promises.push(dispatch(addUserRole(user, role)))
                })

                Promise.all(promises).then(() => {
                    resolve(role)
                })
            })
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const deleteRole =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.delete(`/roles/delete/${id}`)
                .then(() => {
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

const addPermission =
    (params, newPermissionUsers = []) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            return http
                .post(`/permissions/add/`, params)
                .then(({ data: { permission } }) => {
                    const promises = []

                    if (!params.role_id) {
                        newPermissionUsers.forEach((user) => {
                            promises.push(dispatch(addUserPermission(user, permission)))
                        })
                    }

                    Promise.all(promises).then(() => {
                        resolve()
                    })
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const fetchPermissions = () => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))
        dispatch(setPermissions([]))

        http.get('/roles/permissions/list')
            .then(({ data: { permissions } }) => {
                dispatch(setPermissions(permissions))
                dispatch(setIsLoaded(true))
                resolve()
            })
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
            })
    })
}

const deleteRolePermission =
    ({ id: role_id }, { id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.delete(`/roles/permissions/delete/${role_id}/${permission_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const deletePermission = (permission_id) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setFetchError(null))

        http.delete(`/roles/permissions/delete/${permission_id}`)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const fetchPermission =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve) => {
            dispatch(setPermission({}))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get(`/permissions/get/${id}`)
                .then(({ data: { permission } }) => {
                    dispatch(setPermission(permission))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                })
        })
    }

const editPermission = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setIsLoaded(false))
        dispatch(setFetchError(null))

        http.post('/permissions/edit', params)
            .then(({ data: { permission } }) => {
                dispatch(setIsLoaded(true))
                resolve(permission)
            })
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
                reject(e)
            })
    })
}

const deleteUserPermission =
    ({ id: permission_id }, { id: user_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            http.post(`/permissions/delete_user_permission/${permission_id}/${user_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }

const fetchRoles = () => (dispatch) => {
    return new Promise<void>((resolve) => {
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
                    dispatch(setIsLoaded(true))
                    resolve()
                },
            )
            .catch((e) => {
                dispatch(setIsLoaded(false))
                dispatch(setFetchError(e))
            })
    })
}

const fetchRole =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve) => {
            dispatch(setRole({}))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.get(`/roles/get/${id}`)
                .then(({ data: { role } }) => {
                    dispatch(setRole(role))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                })
        })
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
    deleteAvatar,
    addPermission,
    fetchPermissions,
    deleteRolePermission,
    deletePermission,
    editRole,
    deleteUserPermission,
    addUserPermission,
    editPermission,
    fetchPermission,
    deleteRole,
    addRole,
    fetchRoles,
    fetchRole,
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
    [SET_USERS]: (state, { payload }) => {
        return {
            ...state,
            users: payload,
        }
    },
    [SET_UPLOAD_PROGRESS]: (state, { payload }) => {
        return {
            ...state,
            uploadProgress: payload,
        }
    },
    [SET_PERMISSIONS]: (state, { payload }) => {
        return {
            ...state,
            permissions: payload,
        }
    },
    [SET_PERMISSION]: (state, { payload }) => {
        return {
            ...state,
            permission: payload,
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
    permissions: [],
    permission: {},
    users: [],
    role: {},
    roles: [],
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
const getRoles = (state) => getState(state)['roles']
const getRole = (state) => getState(state)['role']
const getPermissions = (state) => getState(state)['permissions']
const getPermission = (state) => getState(state)['permission']
export const selectors = {
    getState,
    getUsers,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getUser,
    getUploadProgress,
    getRoles,
    getRole,
    getPermissions,
    getPermission,
}
