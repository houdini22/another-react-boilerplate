import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { save, fetchPermission, addToastNotification, setIsLoading, permission }) => {
    setIsLoading(true)
    return save({ ...values }).then(
        () => {
            fetchPermission(permission['id']).then(() => {
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: 'Permission has been saved.',
                })
                setIsLoading(false)
            })
        },
        (response) => {
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '#',
            })
            setIsLoading(false)
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const EditFormContainer = compose(
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'EditPermissionForm',
        onSubmit,
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
