export const sortUsersByNameAscending = (users = []) => {
    return users.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
}