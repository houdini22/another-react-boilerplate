import * as moment from 'moment'
import config from '../config'

const formatDateTimeAPI = (date) => {
    return moment(date).format(config['api']['apiDateTimeFormat'])
}

const formatDateAPI = (date) => {
    return moment(date).format(config['api']['apiDateFormat'])
}

const formatDateTime = (date) => {
    return moment(date).format(config['dateTimeFormat'])
}

const formatDate = (date) => {
    return moment(date).format(config['dateFormat'])
}

export { formatDateTimeAPI, formatDateAPI, formatDateTime, formatDate }
export default {
    formatDateTimeAPI,
    formatDateAPI,
    formatDateTime,
    formatDate,
}
