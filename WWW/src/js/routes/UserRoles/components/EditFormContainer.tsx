import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm } from 'redux-form'

const onChange = (values, dispatch, props) => {}

const EditFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        onChange,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'EditRoleForm',
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
