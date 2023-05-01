import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm, formValueSelector } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { SubmissionError } from 'redux-form'

const onSubmit = (values, _, { fetch, close, addPermission }) => {
    if (!values.role_id) {
        return
    }
    return addPermission({ id: values.role_id }, values).then(
        (data) => {
            fetch().then(() => close())
        },
        (response) => {
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddPermissionFormContainer = compose(
    connect((state, props) => {
        const selector = formValueSelector('AddPermissionForm')
        const permission = selector(state, 'permission')
        return {
            permission,
        }
    }),
    reduxForm({
        onSubmit,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        initialValues: {
            name: '',
            guard_name: 'web',
            role_id: 0,
            permission: 'add',
        },
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer }
