import { User } from '../../types.d'

export const mergeUserPermissions = (user: User) => {
    const permissions = {}

    user?.roles?.forEach((role) => {
        role?.permissions?.forEach(({ name, ...rest }) => {
            if (permissions[name]) {
                permissions[name].occurrence++
            } else {
                permissions[name] = { name, ...rest, occurrence: 1 }
            }
        })
    })

    user?.permissions?.forEach(({ name, ...rest }) => {
        if (permissions[name]) {
            permissions[name].occurrence++
        } else {
            permissions[name] = { name, occurrence: 1, ...rest }
        }
    })

    return permissions
}

export const userPermissionFromRoles = (user: User) => {
    const permissions = {}

    user?.roles?.forEach((role) => {
        role?.permissions?.forEach(({ name, ...rest }) => {
            if (permissions[name]) {
                permissions[name].occurrence++
            } else {
                permissions[name] = { name, ...rest, occurrence: 1 }
            }
        })
    })

    return permissions
}

export const sortPermissionsByNameAscending = (permissions = []) => {
    return permissions.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
}
