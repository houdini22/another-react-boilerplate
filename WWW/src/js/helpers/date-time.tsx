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

export const formattedCurrentDate = () => {
    return formatDateTimeAPI(moment())
}

export const formattedDate = ({ year, month, day } = {}) => {
    return moment(new Date(year, month - 1, day)).format(config['api']['apiDateFormat'])
}

export const formattedDateTime = ({ year, month, day, hour, minute, second } = {}) => {
    return moment(new Date(year, month - 1, day, hour, minute, second)).format(config['api']['apiDateTimeFormat'])
}

export { formatDateTimeAPI, formatDateAPI, formatDateTime, formatDate }
export default {
    formatDateTimeAPI,
    formatDateAPI,
    formatDateTime,
    formatDate,
}
