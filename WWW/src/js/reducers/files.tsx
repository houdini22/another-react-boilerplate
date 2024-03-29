import { http } from '../modules/http'

const SET_IS_LOADING = 'files::set-is-loading'
const SET_IS_LOADED = 'files::set-is-loaded'
const SET_FETCH_ERROR = 'files::set-fetch-error'
const SET_UPLOAD_PROGRESS = 'files::set-upload-progress'

const setIsLoading = (data) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_IS_LOADING, payload: data })
        resolve()
    })
}

const setIsLoaded = (data) => (dispatch) => {
    dispatch({ type: SET_IS_LOADED, payload: data })
}

const setFetchError = (data) => (dispatch) => {
    dispatch({ type: SET_FETCH_ERROR, payload: data })
}
const setUploadProgress = (data) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch({ type: SET_UPLOAD_PROGRESS, payload: data })
        resolve()
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

const uploadFiles =
    (files, data = {}) =>
    (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch(setFetchError(null))

            const formData = new FormData()
            for (let i = 0; i < files?.length; i += 1) {
                formData.append(`file_${i}`, files[i])
            }
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

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
                .then((files) => {
                    console.log(files)
                    resolve(files)
                })
                .catch((e) => {
                    dispatch(setFetchError(e))
                    reject(e)
                })
        })
    }
export const actions = {
    setIsLoaded,
    setIsLoading,
    setFetchError,
    deleteFile,
    uploadFiles,
    editFile,
    setUploadProgress,
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
const getIsLoading = (state) => getState(state)['isLoading']
const getIsLoaded = (state) => getState(state)['isLoaded']
const getFetchError = (state) => getState(state)['fetchError']
const getUploadProgress = (state) => getState(state)['uploadProgress']
export const selectors = {
    getState,
    getIsLoading,
    getIsLoaded,
    getFetchError,
    getUploadProgress,
}
