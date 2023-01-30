import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../components'

class UploadFileForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, submit, uploadFiles, uploadProgress, fetch } = this.props

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
