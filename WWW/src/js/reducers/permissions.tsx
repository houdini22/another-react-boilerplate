import { http, myGet } from '../modules/http'
import { Permission } from '../../types.d'

const SET_IS_LOADING = 'permissions::set-is-loading'
const SET_PERMISSIONS = 'permissions::set-permissions'
const SET_PERMISSION = 'permissions::set-permission'
const SET_LOGS_DATA = 'permissions::set-logs-data'
const SET_USERS = 'permissions::set-users'
const SET_ROLES = 'permissions::set-roles'

const setLogsData = (data) => (dispatch) => {
    dispatch({ type: SET_LOGS_DATA, payload: data })
}
const setUsers = (data) => (dispatch) => {
    dispatch({ type: SET_USERS, payload: data })
}
const setRoles = (data) => (dispatch) => {
    dispatch({ type: SET_ROLES, payload: data })
}
const setIsLoading = (data) => (dispatch) => {
    return new Promise<void>((resolve) => {
        dispatch({ type: SET_IS_LOADING, payload: data })
        resolve()
    })
}

const setPermissions = (data) => (dispatch) => {
    dispatch({ type: SET_PERMISSIONS, payload: data })
}

const setPermission = (data) => (dispatch) => {
    dispatch({ type: SET_PERMISSION, payload: data })
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
                dispatch(setPermissions(data))
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

const fetchLogsData = (filters) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        http.get('/permissions/data', {
            params: {
                filters,
            },
        })
            .then(
                ({
                    data: {
                        data: {
                            data: { data },
                        },
                    },
                }) => {
                    dispatch(setLogsData(data))
                    resolve()
                },
            )
            .catch((e) => {
                reject()
            })
    })
}
const fetchUsers = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        myGet('/users/list').then(
            (data) => {
                dispatch(setUsers(data))
                resolve()
            },
            () => {
                reject()
            },
        )
    })
}
const fetchRoles = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        myGet('/roles/list').then(
            (data) => {
                dispatch(setRoles(data))
                resolve()
            },
            () => {
                reject()
            },
        )
    })
}
export const actions = {
    setIsLoading,
    addPermission,
    fetchPermissions,
    deleteRolePermission,
    deletePermission,
    deleteUserPermission,
    addUserPermission,
    editPermission,
    fetchPermission,
    fetchLogsData,
    fetchUsers,
    fetchRoles,
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
    [SET_LOGS_DATA]: (state, { payload }) => {
        return {
            ...state,
            logsData: payload,
        }
    },
    [SET_USERS]: (state, { payload }) => {
        return {
            ...state,
            users: payload,
        }
    },
    [SET_ROLES]: (state, { payload }) => {
        return {
            ...state,
            roles: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoading: false,
    permissions: [],
    permission: {},
    logsData: {},
    users: [],
    roles: [],
})

export default function permissionsReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['permissions']
const getIsLoading = (state) => getState(state)['isLoading']
const getPermissions = (state) => getState(state)['permissions']
const getPermission = (state) => getState(state)['permission']
const getLogsData = (state) => getState(state)['logsData']
const getUsers = (state) => getState(state)['users']
const getRoles = (state) => getState(state)['roles']
export const selectors = {
    getState,
    getIsLoading,
    getPermissions,
    getPermission,
    getLogsData,
    getUsers,
    getRoles,
}
