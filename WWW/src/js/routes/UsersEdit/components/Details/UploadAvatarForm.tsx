import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../../components'

class UploadAvatarForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, onChangeFile, uploadProgress } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                {uploadProgress !== -1 && <Progress progress={uploadProgress} />}
                <Field
                    name="avatar"
                    label="File"
                    type="file"
                    component={FormField}
                    onChange={(e) => onChangeFile(e)}
                    accept={'image/png,image/gif,image/jpg'}
                />
            </form>
        )
    }
}

export { UploadAvatarForm }
export default { UploadAvatarForm }
