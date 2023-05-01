import * as React from 'react'
import { compose } from 'redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = ({ email, name, status, password, password_confirmation }, _, { addUser, navigate }) => {
    return addUser({ email, name, status, password, password_confirmation }).then(
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
        form: 'AddUserForm',
        onSubmit,
        initialValues: {
            name: '',
            password: '',
            password_confirmation: '',
            email: '',
            status: 0,
        },
    }),
)(FormComponent)

export { AddFormContainer }
export default { AddFormContainer }
