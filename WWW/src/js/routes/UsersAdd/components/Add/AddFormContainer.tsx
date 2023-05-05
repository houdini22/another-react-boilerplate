import * as React from 'react'
import { compose } from 'redux'
import { AddForm as FormComponent } from './AddForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { connect } from 'react-redux'

const onSubmit = (
    { email, name, status, password, password_confirmation },
    _,
    { addUser, navigate, addToastNotification, newUserRoles, newUserPermissions },
) => {
    return addUser({ email, name, status, password, password_confirmation }, newUserRoles, newUserPermissions).then(
        (user) => {
            addToastNotification({
                title: 'Save success.',
                text: `User has been saved with ID: ${user.id}.`,
                type: 'success',
                href: '/users/add',
            })
            navigate(`/users/edit?id=${user.id}`)
        },
        (response) => {
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '/users/add',
            })
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
    connect((state, { setIsLoading }) => {
        return {
            setIsLoading,
        }
    }),
)(FormComponent)

export { AddFormContainer }
export default { AddFormContainer }
