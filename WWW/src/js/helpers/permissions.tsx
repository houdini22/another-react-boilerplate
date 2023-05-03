export const mergeUserPermissions = (user) => {
    const permissions = {}

    user?.roles?.forEach(({ permissions }) => {
        permissions?.forEach(({ name, ...rest }) => {
            if (permissions[name]) {
                if (!permissions[name].occurence) {
                    permissions[name].occurence = 1
                }
                permissions[name].occurence++
            } else {
                permissions[name] = { name, ...rest }
            }
        })
    })

    user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
        if (permissions[name]) {
            if (!permissions[name].occurence) {
                permissions[name].occurence = 1
            }
            permissions[name].occurence++
        } else {
            permissions[name] = { name, id, guard_name, is_deletable, ...rest }
        }
    })

    return permissions
}
