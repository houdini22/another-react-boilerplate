import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, formValueSelector } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { SubmissionError } from 'redux-form'

const onSubmit = (values, _, { setIsLoading, addPermission, addToastNotification, navigate, newPermissionUsers }) => {
    setIsLoading(true)

    return addPermission({ ...values, guard_name: 'web' }, newPermissionUsers).then(
        (permission) => {
            setIsLoading(false)
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: `Permission has been saved with ID: ${permission?.id}.`,
                href: '/permissions/add',
            })
            navigate('/permissions/add')
        },
        (response) => {
            setIsLoading(false)
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '/permissions/add',
            })
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddFormContainer = compose(
    connect((state, props) => {
        const selector = formValueSelector('AddPermissionForm')
        const role_id = selector(state, 'role_id')
        return {
            role_id,
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
            role_id: '',
        },
    }),
)(FormComponent)

export { AddFormContainer }
export default { AddFormContainer }
