import * as React from 'react'
import { compose } from 'redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { addUser, user, navigate }) => {
    return addUser({ ...user, ...values }).then(
        (user) => {
            navigate(`/users/edit?id=${user.id}`)
        },
        (response) => {
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddFormContainer = compose(
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'EditUserForm',
        onSubmit,
    }),
)(FormComponent)

export { AddFormContainer }
export default { AddFormContainer }
