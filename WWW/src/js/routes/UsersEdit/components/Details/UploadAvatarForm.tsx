import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../../components'

class UploadAvatarForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, onChange, uploadProgress } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                {uploadProgress !== -1 && <Progress progress={uploadProgress} />}
                <Field
                    name="avatar"
                    label="File"
                    type="file"
                    component={FormField}
                    onChange={(e) => onChange(e)}
                    accept={'image/png,image/gif,image/jpg'}
                />
            </form>
        )
    }
}

export { UploadAvatarForm }
export default { UploadAvatarForm }
