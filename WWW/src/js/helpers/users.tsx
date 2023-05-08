export const sortUsersByNameAscending = (users = []) => {
    return users.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
}

export const getDefaultFilters = () => ({
    order_by: 'id',
    order_direction: 'desc',
    items_per_page: 15,
    search: '',
    status: 'yes_or_no',
    has_avatar: 'yes_or_no',
    roles: [],
    permissions: [],
    has_files: 'yes_or_no',
    has_roles: 'yes_or_no',
    has_permissions: 'yes_or_no',
})
