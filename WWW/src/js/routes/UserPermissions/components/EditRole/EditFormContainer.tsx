import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { addRole, fetch, close }) => {
    return addRole(values).then(
        (data) => {
            fetch().then(() => close())
        },
        (response) => {
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
        form: 'EditRoleForm',
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
