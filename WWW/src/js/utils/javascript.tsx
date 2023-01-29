import _ from 'lodash'

export const ifDeepDiff = (object, base) => {
    const diff = deepDiff(object, base)

    try {
        return Object.keys(diff).length > 0
    } catch (e) {
        return false
    }
}

export const deepDiff = (object, base) => {
    function changes(object, base) {
        return _.transform(object, function (result, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value
            }
        })
    }

    return changes(object, base)
}
