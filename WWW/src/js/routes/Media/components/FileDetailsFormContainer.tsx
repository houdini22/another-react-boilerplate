import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { FileDetailsForm as FormComponent } from './FileDetailsForm'
import { reduxForm } from 'redux-form'

const onSubmit = (values, dispatch, props) => {
    const { editFile, file, addToastNotification, fetch } = props

    editFile(file, values).then(
        () => {
            fetch().then(() => {
                addToastNotification({
                    type: 'success',
                    title: 'File saved successfully',
                })
            })
        },
        (e) => {
            addToastNotification({
                type: 'danger',
                title: 'Save error',
            })
        },
    )
}

const FileDetailsFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        onSubmit,
        enableReinitialize: false,
        destroyOnUnmount: true,
        form: 'UploadFileForm',
    }),
)(FormComponent)

export { FileDetailsFormContainer }
export default { FileDetailsFormContainer }
