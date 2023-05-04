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
                    title: 'Save success.',
                    text: `File ID: ${file.id} has been saved.`,
                    href: `/media`,
                })
            })
        },
        (response) => {
            addToastNotification({
                title: 'Save error.',
                text: response.message,
                type: 'danger',
                href: `/media`,
            })
        },
    )
}

const FileDetailsFormContainer = compose(
    connect(() => {
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
