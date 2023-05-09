import _ from 'lodash'

export const splitIds = (uriValue: string): Array<number> => {
    return !!uriValue ? uriValue.split(',').map((n) => Number(n)) : []
}

export const createUrlFilters = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (_.isEmpty(obj[key])) {
            delete obj[key]
        }
    })

    return obj
}
