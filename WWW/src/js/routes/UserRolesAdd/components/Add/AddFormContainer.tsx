import * as React from 'react'
import { compose } from 'redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { connect } from 'react-redux'

const onSubmit = (
    values,
    _,
    { save, setIsLoading, addToastNotification, reset, newRolePermissions, newRoleUsers, navigate },
) => {
    setIsLoading(true)
    return save({ ...values }, newRolePermissions, newRoleUsers).then(
        (role) => {
            setIsLoading(false)
            reset()
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: `Role has been saved with ID: ${role.id}.`,
                href: '/roles/add',
            })
            navigate(`/roles/add`)
        },
        (response) => {
            setIsLoading(false)
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '/roles/add',
            })
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddFormContainer = compose(
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'AddRoleForm',
        onSubmit,
    }),
    connect((state, { setIsLoading }) => {
        return {
            setIsLoading,
        }
    }),
)(FormComponent)

export { AddFormContainer }
export default { EditFormContainer: AddFormContainer }
