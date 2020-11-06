import LocalStorageDB from 'localstoragedb'

const LocalStorage = new LocalStorageDB('library', localStorage)

if (LocalStorage.isNew()) {
    LocalStorage.createTableWithData('LoginFormContainer', [
        {
            email: '',
        },
    ])
    LocalStorage.commit()
}

export { LocalStorage }
export default { LocalStorage }
