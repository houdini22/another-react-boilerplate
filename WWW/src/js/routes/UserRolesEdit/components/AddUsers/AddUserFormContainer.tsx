import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddUserForm as FormComponent } from './AddUserForm'
import { reduxForm } from 'redux-form'

const onSubmit = ({ user_id }, _, { setIsLoading, addUserRole, role, fetch, addToastNotification, reset }) => {
    return setIsLoading(true).then(() => {
        return addUserRole({ id: user_id }, role).then(() => {
            Promise.all([fetch()]).then(() => {
                setIsLoading(false)
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: `Role ID: ${role.id} has been added to User ID: ${user_id}.`,
                    href: `/roles/edit?id=${role}`,
                })
                reset()
            })
        })
    })
}

const validate = ({ user_id }) => {
    const errors = {}

    if (!user_id) {
        errors.user_id = 'Required.'
    }

    return errors
}

const AddUserFormContainer = compose(
    connect(),
    reduxForm({
        onSubmit,
        validate,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddUserToRoleForm',
        initialValues: {
            name: '',
            role_id: 0,
            permission: 'add',
        },
    }),
)(FormComponent)

export { AddUserFormContainer }
export default { AddPermissionFormContainer: AddUserFormContainer }
