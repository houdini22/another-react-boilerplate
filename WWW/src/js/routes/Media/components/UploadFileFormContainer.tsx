import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { UploadFileForm as FormComponent } from './UploadFileForm'
import { reduxForm } from 'redux-form'

const UploadFileFormContainer = compose(
    connect(() => {
        return {}
    }),
    reduxForm({
        enableReinitialize: false,
        destroyOnUnmount: true,
        form: 'UploadFileForm',
    }),
)(FormComponent)

export { UploadFileFormContainer }
export default { UploadAvatarFormContainer: UploadFileFormContainer }
