import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { editRole, role, fetchOne }) => {
    return editRole({ ...role, ...values }).then(
        () => {
            Promise.all([fetchOne(role['id'])]).then(() => {})
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
        form: 'EditUserRoleForm',
        onSubmit,
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
