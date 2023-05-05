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
