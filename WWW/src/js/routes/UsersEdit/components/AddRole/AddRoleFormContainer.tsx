import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddRoleForm as FormComponent } from './AddRoleForm'
import { reduxForm, formValueSelector } from 'redux-form'

const onChange = (values, dispatch, props) => {}

const AddRoleFormContainer = compose(
    connect((state, props) => {
        const selector = formValueSelector('AddRoleForm')
        const permission = selector(state, 'role')
        return {
            permission,
        }
    }),
    reduxForm({
        onChange,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddRoleForm',
    }),
)(FormComponent)

export { AddRoleFormContainer }
export default { AddPermissionFormContainer: AddRoleFormContainer }
