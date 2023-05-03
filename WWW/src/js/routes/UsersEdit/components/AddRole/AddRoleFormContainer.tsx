import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddRoleForm as FormComponent } from './AddRoleForm'
import { reduxForm, formValueSelector } from 'redux-form'

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
    }),
)(FormComponent)

export { AddRoleFormContainer }
export default { AddPermissionFormContainer: AddRoleFormContainer }
