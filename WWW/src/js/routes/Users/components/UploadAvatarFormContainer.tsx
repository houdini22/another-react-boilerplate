import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { UploadAvatarForm as FormComponent } from './UploadAvatarForm'
import { reduxForm } from 'redux-form'

const onSubmit = (values, dispatch, props) => {
    const { editUser, setIsLoading } = props

    setIsLoading(true)

    return editUser(values).then(() => {
        setIsLoading(false)
    })
}

const UploadAvatarFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        enableReinitialize: false,
        destroyOnUnmount: true,
        form: 'UploadAvatarForm',
    }),
)(FormComponent)

export { UploadAvatarFormContainer }
export default { UploadAvatarFormContainer }
