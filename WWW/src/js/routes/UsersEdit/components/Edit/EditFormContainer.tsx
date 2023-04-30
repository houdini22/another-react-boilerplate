import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { editUser, user, fetchOne }) => {
    return editUser({ ...user, ...values }).then(
        () => {
            Promise.all([fetchOne(user['id'])]).then(() => {})
        },
        (response) => {
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
