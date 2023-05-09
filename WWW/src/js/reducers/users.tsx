import { http, myGet } from '../modules/http'
import { Permission, Role, User } from '../../types.d'

const SET_IS_LOADING = 'users::set-is-loading'
const SET_USER = 'users::set-user'
const SET_USERS = 'users::set-users'
const SET_UPLOAD_PROGRESS = 'users::set-upload-progress'
const SET_PERMISSIONS = 'users::set-permissions'
const SET_PERMISSION = 'users::set-permission'
const SET_ROLES = 'users::set-roles'
const SET_ROLE = 'users::set-role'
const SET_LOGS_DATA = 'users::set-logs-data'

const setLogsData = (data) => (dispatch) => {
    dispatch({ type: SET_LOGS_DATA, payload: data })
}
const setIsLoading = (data) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_IS_LOADING, payload: data })
        resolve()
    })
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
        http.put('/users/edit', params)
            .then(({ data }) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const deleteAvatar = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.post(`/users/delete_avatar`, user)
            .then(({ data }) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const addUserPermission =
    ({ id: user_id }, { id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.post(`/permissions/add/${user_id}/${permission_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const addUser = (params, newUserRoles, newUserPermissions) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
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
                    resolve(user)
                })
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const fetchOne =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            setUser({})
            return myGet(`/users/get/${id}`).then(
                (data) => {
                    dispatch(setUser(data?.user))
                    resolve()
                },
                () => {
                    reject()
                },
            )
        })
    }

const fetch = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        return myGet('/users/list').then(
            (data) => {
                dispatch(setUsers(data?.users))
                resolve()
            },
            () => {
                reject()
            },
        )
    })
}

const deleteUser = (user: User) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.delete(`/users/delete/${user.id}`)
            .then(({ data: { user } }) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const deleteUserRole =
    ({ id: user_id }, { id: role_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.delete(`/roles/permissions/delete_user_role/${user_id}/${role_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const addUserRole =
    ({ id: user_id }, { id: role_id = 0 } = {}) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.post(`/users/roles/add/${user_id}/${role_id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const sendActivationEmail =
    ({ id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.post(`/users/send_activation_email`, {
                id,
            })
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const sendAvatar =
    ({ id }, file) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
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
                    reject(e)
                })
        })
    }
const forceLogin =
    ({ id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.post(`/users/force_login/${id}`)
                .then(({ data: { user } }) => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
const activateUser = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.post(`/users/activate/${user.id}`, { user })
            .then(({ data: { user } }) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}
const deactivateUser = (user) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.post(`/users/deactivate/${user.id}`, { user })
            .then(({ data: { user } }) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const editRole = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.post('/roles/edit', params)
            .then(({}) => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const addRole = (params, rolePermissions, roleUsers) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        return http
            .post('/roles/add', params)
            .then(({ data: { role } }) => {
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
                reject(e)
            })
    })
}

const deleteRole = (role: Role) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.delete(`/roles/delete/${role.id}`)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const addPermission =
    (params, newPermissionUsers = []) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
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
                        resolve(permission)
                    })
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const fetchPermissions = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        myGet('/roles/permissions/list').then(
            (data) => {
                dispatch(setPermissions(data['permissions']))
                resolve()
            },
            () => {
                reject()
            },
        )
    })
}

const deleteRolePermission =
    ({ id: role_id }, { id: permission_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.delete(`/roles/permissions/delete/${role_id}/${permission_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const deletePermission = (permission: Permission) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.delete(`/roles/permissions/delete/${permission.id}`)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const fetchPermission =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setPermission({}))

            myGet(`/permissions/get/${id}`).then(
                (data) => {
                    dispatch(setPermission(data.permission))
                    resolve()
                },
                () => {
                    reject()
                },
            )
        })
    }

const editPermission = (params) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.post('/permissions/edit', params)
            .then(({ data: { permission } }) => {
                resolve(permission)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const deleteUserPermission =
    ({ id: permission_id }, { id: user_id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            http.post(`/permissions/delete_user_permission/${permission_id}/${user_id}`)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

const fetchRoles = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        myGet('/roles/list').then(
            (data) => {
                dispatch(setRoles(data.roles))
                resolve()
            },
            () => {
                reject()
            },
        )
    })
}

const fetchLogsData = (filters) => (dispatch) => {
    return myGet(
        '/logs/data',
        { filters },
        {
            success: (data) => {
                dispatch(setLogsData(data))
            },
            failure: (e) => {},
        },
    )
}

const fetchRole =
    (id = 0) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setRole({}))
            myGet(`/roles/get/${id}`).then(
                (data) => {
                    dispatch(setRole(data.role))
                    resolve()
                },
                () => {
                    reject()
                },
            )
        })
    }
export const actions = {
    fetch,
    fetchOne,
    setIsLoading,
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
    fetchLogsData,
    setUser,
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
    [SET_LOGS_DATA]: (state, { payload }) => {
        return {
            ...state,
            logsData: payload,
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
    logsData: {},
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
const getLogsData = (state) => getState(state)['logsData']
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
    getLogsData,
}
