import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm } from 'redux-form'

const EditFormContainer = compose(
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'EditUserForm',
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
