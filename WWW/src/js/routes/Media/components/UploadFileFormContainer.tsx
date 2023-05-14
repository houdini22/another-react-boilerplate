import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { UploadFileForm as FormComponent } from './UploadFileForm'
import { reduxForm, formValueSelector } from 'redux-form'

export const FORM_NAME = 'upload-files-form'
const selector = formValueSelector(FORM_NAME)
const UploadFileFormContainer = compose(
    connect((state) => {
        const className = selector(state, 'class');
        return {
            className,
        }
    }),
    reduxForm({
        enableReinitialize: false,
        destroyOnUnmount: true,
        form: FORM_NAME,
    }),
)(FormComponent)

export { UploadFileFormContainer }
export default { UploadAvatarFormContainer: UploadFileFormContainer }
