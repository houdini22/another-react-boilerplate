import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { editUser, user, fetchOne, addToastNotification, setIsLoading }) => {
    setIsLoading(true)
    return editUser({ ...user, ...values }).then(
        () => {
            Promise.all([fetchOne(user['id'])]).then(() => {
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: `User ID: ${user.id} has been saved.`,
                    href: `/users/edit?id=${user['id']}`,
                })
                setIsLoading(false)
            })
        },
        (response) => {
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: `/users/edit?id=${user['id']}`,
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
        form: 'EditUserForm',
        onSubmit,
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
