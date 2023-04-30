import axios from 'axios'
import { actions as commonActions } from '../reducers/common'
import { store } from '../../index'
import config from '../config'

const { setConnectionErrorModalVisible, setFetchError } = commonActions

const instance = axios.create({
    baseURL: config['api']['baseURL'],
    timeout: config['api']['timeout'],
})

instance.interceptors.response.use(
    undefined,
    ({ message, code, response: { status, data, statusText } = {}, ...rest }) => {
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
        }
        return Promise.reject({ message, status, code, data, statusText })
    },
)

const setAuthToken = (token) => {
    instance.defaults.headers.common['X-SESSION-TOKEN'] = token
}

const processAPIerrorResponseToFormErrors = (response) => {
    const { response: { data: { errors = {} } = {} } = {} } = response
    const res = {}

    Object.keys(errors).forEach((key) => {
        res[key] = errors[key].join('\n')
    })

    return res
}

export default instance
export { setAuthToken, instance as http, processAPIerrorResponseToFormErrors }
