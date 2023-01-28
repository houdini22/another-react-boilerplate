import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm } from 'redux-form'

const onChange = (values, dispatch, props) => {}

const onSubmit = (values, dispatch, props) => {
    const { editUser, setIsLoading } = props

    setIsLoading(true)

    return editUser(values).then(() => {
        setIsLoading(false)
    })
}

const EditFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        onChange,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'EditUserForm',
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
