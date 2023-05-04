import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm } from 'redux-form'

const onSubmit = (
    { permission_id = 0 },
    _,
    { setIsLoading, addUserPermission, fetchOne, user, addToastNotification },
) => {
    setIsLoading(true)

    addUserPermission(user, { id: permission_id }).then((permission) => {
        fetchOne(user['id']).then(() => {
            setIsLoading(false)
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: `Permission ID: ${permission_id} has been added to User ID: ${user.id}.`,
                href: `/users/edit?id=${user.id}`,
            })
        })
    })
}

const AddPermissionFormContainer = compose(
    connect(),
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        onSubmit,
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer: AddPermissionFormContainer }
