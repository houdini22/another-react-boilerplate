import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { UploadAvatarForm as FormComponent } from './UploadAvatarForm'
import { reduxForm } from 'redux-form'

const UploadAvatarFormContainer = compose(
    connect(() => {
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
