import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm } from 'redux-form'

const onSubmit = ({ permission_id }, _, { setIsLoading, addUserPermission, fetchOne, user, addToastNotification }) => {
    return setIsLoading(true).then(() => {
        return addUserPermission(user, { id: permission_id }).then((permission) => {
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
    })
}

const validate = (values) => {
    const errors = {}

    if (!values.permission_id) {
        errors['permission_id'] = 'Required.'
    }

    return errors
}

const AddPermissionFormContainer = compose(
    connect(),
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        initialValues: {
            permission_id: '',
        },
        onSubmit,
        validate,
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer: AddPermissionFormContainer }
