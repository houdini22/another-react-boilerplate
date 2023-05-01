import { http } from '../modules/http'

const SET_IS_LOADING = 'files::set-is-loading'
const SET_IS_LOADED = 'files::set-is-loaded'
const SET_FETCH_ERROR = 'files::set-fetch-error'
const SET_FILES = 'files::set-files'
const SET_UPLOAD_PROGRESS = 'files::set-upload-progress'

const setIsLoading = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: data })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}

const setFiles = (data) => (dispatch) => {
    dispatch({ type: SET_FILES, payload: data })
}

const setUploadProgress = (data) => (dispatch) => {
    dispatch({ type: SET_UPLOAD_PROGRESS, payload: data })
}

const fetch =
    (params = {}) =>
    (dispatch) => {
        return new Promise<void>((resolve) => {
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))
            dispatch(setFiles([]))

            http.get('/files/list', {
                params,
            })
                .then(({ data: { files } }) => {
                    dispatch(setFiles(files))
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

const deleteFile =
    ({ id }) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.delete(`/files/delete/${id}`)
                .then(() => {
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

const editFile =
    ({ id }, values) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setIsLoading(true))
            dispatch(setIsLoaded(false))
            dispatch(setFetchError(null))

            http.post(`/files/edit/${id}`, values)
                .then(() => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(true))
                    resolve()
                })
                .catch((e) => {
                    dispatch(setIsLoading(false))
                    dispatch(setIsLoaded(false))
                    dispatch(setFetchError(e))
                    reject()
                })
        })
    }

const uploadFiles = (e) => (dispatch) => {
    return new Promise<void>((resolve, reject) => {
        dispatch(setFetchError(null))

        const formData = new FormData()
        for (let i = 0; i < e?.target?.files?.length; i += 1) {
            formData.append(`file_${i}`, e.target.files[i])
        }

        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent
            let percent = Math.floor((loaded * 100) / total)
            if (percent <= 100) {
                dispatch(setUploadProgress(percent))
            }
        }

        http.post(`/files/upload`, formData, {
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
export const actions = {
    fetch,
    setIsLoaded,
    setIsLoading,
    setFetchError,
    deleteFile,
    uploadFiles,
    editFile,
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
    [SET_FILES]: (state, { payload }) => {
        return {
            ...state,
            files: payload,
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
    files: [],
    isLoading: false,
    isLoaded: false,
    fetchError: null,
    uploadProgress: -1,
})

export default function filesReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['files']
const getFiles = (state) => getState(state)['files']
const getIsLoading = (state) => getState(state)['isLoading']
const getIsLoaded = (state) => getState(state)['isLoaded']
const getFetchError = (state) => getState(state)['fetchError']
const getUploadProgress = (state) => getState(state)['uploadProgress']
export const selectors = {
    getState,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getFiles,
    getUploadProgress,
}
