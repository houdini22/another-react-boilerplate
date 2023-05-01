import LocalStorageDB from 'localstoragedb'

const LocalStorage = new LocalStorageDB('library', localStorage)

if (LocalStorage.isNew()) {
    LocalStorage.createTableWithData('LoginFormContainer', [
        {
            email: '',
            token: '',
        },
    ])
    LocalStorage.createTableWithData('ListManagerFilters', [
        {
            name: '',
            filters: {},
        },
    ])
    LocalStorage.createTableWithData('CardMinimize', [
        {
            name: '',
            minimized: false,
        },
    ])
    LocalStorage.commit()
}

export { LocalStorage }
export default { LocalStorage }
