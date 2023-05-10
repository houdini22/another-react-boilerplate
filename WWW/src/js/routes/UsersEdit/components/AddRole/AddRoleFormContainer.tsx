import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddRoleForm as FormComponent } from './AddRoleForm'
import { reduxForm, formValueSelector } from 'redux-form'

const validate = ({ role }) => {
    const errors = {}

    if (!role) {
        errors['role'] = 'Required.'
    }

    return errors
}

const AddRoleFormContainer = compose(
    connect((state) => {
        const selector = formValueSelector('AddRoleForm')
        const permission = selector(state, 'role')
        return {
            permission,
        }
    }),
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddRoleForm',
        initialValues: {
            role: '',
        },
        validate,
    }),
)(FormComponent)

export { AddRoleFormContainer }
export default { AddPermissionFormContainer: AddRoleFormContainer }
