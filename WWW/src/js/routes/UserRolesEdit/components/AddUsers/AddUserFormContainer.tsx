import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddUserForm as FormComponent } from './AddUserForm'
import { reduxForm } from 'redux-form'

const onSubmit = ({ user_id }, _, { setIsLoading, addUserRole, role, fetch, addToastNotification, reset }) => {
    setIsLoading(true)

    return addUserRole({ id: user_id }, role).then(() => {
        Promise.all([fetch()]).then(() => {
            setIsLoading(false)
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: 'Role has been saved.',
            })
            reset()
        })
    })
}

const AddUserFormContainer = compose(
    connect(() => {}),
    reduxForm({
        onSubmit,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddUserToRoleForm',
        initialValues: {
            name: '',
            guard_name: 'web',
            role_id: 0,
            permission: 'add',
        },
    }),
)(FormComponent)

export { AddUserFormContainer }
export default { AddPermissionFormContainer: AddUserFormContainer }
