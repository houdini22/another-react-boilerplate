import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { UploadTreeFileForm as FormComponent } from './UploadTreeFileForm'
import { reduxForm, formValueSelector } from 'redux-form'

export const FORM_NAME = 'upload-tree-files-form'
const selector = formValueSelector(FORM_NAME)
const UploadTreeFileFormContainer = compose(
    connect((state) => {
        return {
        }
    }),
    reduxForm({
        enableReinitialize: false,
        destroyOnUnmount: true,
        form: FORM_NAME,
    }),
)(FormComponent)

export { UploadTreeFileFormContainer }
export default { UploadTreeFileFormContainer }
