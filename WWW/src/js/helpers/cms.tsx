import moment from 'moment'

export const generateUrl = (parentUrl = '', categoryName = '') => {
    if (!parentUrl) {
        parentUrl = ''
    }

    const value = categoryName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]+/g, '')
        .replace(/-+/g, '-')
        .replace(/[\!\@\#\$\^\&\*\(\)\_\+\=\:\;\"\'\<\,\>\>\?\~\`]+/g, '')
        .trim()

    return `${parentUrl}/${value}`
}

export const isPublished = (node = {}) => {
    if (!node.tree_is_published) return false

    if (typeof node.tree_published_from === 'string') {
        if (moment(node.tree_published_from, 'YYYY-MM-DD HH:mm:ss').unix() > moment().unix()) {
            return false
        }
    }
    if (typeof node.tree_published_to === 'string') {
        if (moment(node.tree_published_to, 'YYYY-MM-DD HH:mm:ss').unix() < moment().unix()) {
            return false
        }
    }

    return true
}

export const getDefaultFilters = () => ({
    search_in: 'current',
    is_published: 'yes_or_no',
    type: 'all',
    search: '',
})
