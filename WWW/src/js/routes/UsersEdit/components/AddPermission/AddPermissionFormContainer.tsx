import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm, formValueSelector } from 'redux-form'

const onSubmit = ({ permission_id = 0 }, _, { setIsLoading, addUserPermission, fetchOne, user }) => {
    setIsLoading(true)

    addUserPermission(user, { id: permission_id }).then(() => {
        fetchOne(user['id']).then(() => {
            setIsLoading(false)
        })
    })
}

const AddPermissionFormContainer = compose(
    connect((state, props) => {}),
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        onSubmit,
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer: AddPermissionFormContainer }
