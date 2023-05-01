import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { editPermission, addToastNotification, fetch, close }) => {
    return editPermission(values).then(
        () => {
            fetch().then(() => {
                close()
            })
            addToastNotification({
                type: 'success',
                title: 'Save success.',
                text: 'Role has been saved.',
            })
        },
        (response) => {
            addToastNotification({
                type: 'danger',
                title: 'Save failed.',
                text: response.message.message,
            })
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const EditFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        onSubmit,
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'EditPermissionForm',
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
