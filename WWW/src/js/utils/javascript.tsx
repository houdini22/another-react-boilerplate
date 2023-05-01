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

export const getReadableFileSizeString = (fileSizeInBytes) => {
    let i = -1
    const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
    do {
        fileSizeInBytes /= 1024
        i++
    } while (fileSizeInBytes > 1024)

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}
