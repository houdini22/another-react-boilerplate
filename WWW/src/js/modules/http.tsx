import axios from 'axios'
import { actions as commonActions } from '../reducers/common'
import { store } from '../../index'
import config from '../config'
import _ from 'lodash'

const { setConnectionErrorModalVisible, setFetchError, set404error } = commonActions

const instance = axios.create({
    baseURL: config['api']['baseURL'],
    timeout: config['api']['timeout'],
})

instance.interceptors.response.use(undefined, ({ message, code, response: { status, data, statusText, ...responseRest } = {}, ...rest }) => {
    if (code === 'ERR_NETWORK') {
        store.dispatch(
            setConnectionErrorModalVisible({
                message,
                status,
                code,
                data,
                statusText,
            }),
        )
    }
    if (status === 500) {
        store.dispatch(setFetchError({ message, code, status, data, statusText }))
    } else if (status === 401) {
        import('../reducers/auth').then((obj) => {
            store.dispatch(obj.actions.gentlyLogOff())
        })
    } else if (status === 404) {
        store.dispatch(set404error({ message, code, status, data, statusText }))
    }
    return Promise.reject({ message, status, code, data, statusText })
})

const setAuthToken = (token) => {
    instance.defaults.headers.common['X-SESSION-TOKEN'] = token
}

const processAPIerrorResponseToFormErrors = (response) => {
    const { data: { errors = {} } = {} } = response
    const res = {}

    Object.keys(errors).forEach((key) => {
        _.set(res, key, errors[key].join('\n'))
    })

    return res
}

export const myGet = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance
            .get(url, { params })
            .then(
                ({
                    data: {
                        data: { data },
                    },
                }) => {
                    console.log(data)
                    resolve(data)
                },
            )
            .catch((e) => {
                reject(e)
            })
    })
}

export default instance
export { setAuthToken, instance as http, processAPIerrorResponseToFormErrors }
