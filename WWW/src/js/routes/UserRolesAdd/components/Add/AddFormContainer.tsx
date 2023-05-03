import * as React from 'react'
import { compose } from 'redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { save, setIsLoading, addToastNotification, reset }) => {
    setIsLoading(true)
    return save({ ...values }).then(
        (role) => {
            setIsLoading(false)
            reset()
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: 'Role has been saved.',
            })
        },
        (response) => {
            setIsLoading(false)
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '#',
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
)(FormComponent)

export { AddFormContainer }
export default { EditFormContainer: AddFormContainer }
