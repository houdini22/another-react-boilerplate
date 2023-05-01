import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../components'

class UploadFileForm extends React.Component {
    render() {
        const { handleSubmit, uploadFiles, uploadProgress, fetch, addToastNotification } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <Field
                    name="files"
                    label="Files"
                    type="file"
                    component={FormField}
                    onChange={(e) =>
                        uploadFiles(e).then(() => {
                            fetch()
                            addToastNotification({
                                type: 'success',
                                title: 'Upload success.',
                                text: 'Files has been saved.',
                            })
                        })
                    }
                    multiple
                />
                {uploadProgress !== -1 && <Progress progress={uploadProgress} />}
            </form>
        )
    }
}

export { UploadFileForm }
export default { UploadAvatarForm: UploadFileForm }
