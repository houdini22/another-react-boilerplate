import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { save, addToastNotification, setIsLoading }) => {
    return setIsLoading(true).then(() => {
        return save({ ...values }).then(
            () => {
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: `CMS Settings was saved.`,
                    href: `/cms/settings`,
                })
                setIsLoading(false)
            },
            (response) => {
                addToastNotification({
                    title: 'Form Validation Error',
                    text: response.message,
                    type: 'danger',
                    href: `/cms/settings`,
                })
                setIsLoading(false)
                throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
            },
        )
    })
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
export default EditFormContainer
