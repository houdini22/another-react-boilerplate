export const mergeUserPermissions = (user) => {
    const permissions = {}

    user?.roles?.forEach((role) => {
        role?.permissions?.forEach(({ name, ...rest }) => {
            if (permissions[name]) {
                permissions[name].occurence++
            } else {
                permissions[name] = { name, ...rest, occurence: 1 }
            }
        })
    })

    user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
        if (permissions[name]) {
            permissions[name].occurence++
        } else {
            permissions[name] = { name, id, guard_name, is_deletable, occurence: 1, ...rest }
        }
    })

    return permissions
}

export const userPermissionFromRoles = (user) => {
    const permissions = {}

    user?.roles?.forEach((role) => {
        role?.permissions?.forEach(({ name, ...rest }) => {
            if (permissions[name]) {
                permissions[name].occurence++
            } else {
                permissions[name] = { name, ...rest, occurence: 1 }
            }
        })
    })

    return permissions
}
