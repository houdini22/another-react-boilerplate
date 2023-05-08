export const sortRolesByNameAscending = (roles = []) => {
    return roles.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
}

export const getDefaultFilters = () => ({
    items_per_page: 15,
    order_by: 'id',
    order_direction: 'asc',
    permissions: [],
    has_permissions: 'yes_or_no',
    has_users: 'yes_or_no',
    user: '',
    roles: [],
    search: '',
})
