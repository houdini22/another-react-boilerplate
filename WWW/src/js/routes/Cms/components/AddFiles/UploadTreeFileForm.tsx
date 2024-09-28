import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../../components'

class UploadTreeFileForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, uploadFiles, uploadProgress, fetch, addToastNotification, className, setIsLoading, treeParentId } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <Field
                    name="files"
                    label="Files"
                    type="file"
                    component={FormField}
                    onChange={(e) =>
                        setIsLoading(true).then(() => {
                            uploadFiles(e.target.files, {
                                'class': className,
                                'tree_parent_id': treeParentId,
                            }).then(() => {
                                addToastNotification({
                                    type: 'success',
                                    title: 'Upload success.',
                                    text: 'Files has been uploaded.',
                                    href: '/cms',
                                })
                                setIsLoading(false);
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

export { UploadTreeFileForm }
export default { UploadTreeFileForm }
