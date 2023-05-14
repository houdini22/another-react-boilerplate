import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../components'

class UploadFileForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, uploadFiles, uploadProgress, fetch, addToastNotification, className, setIsLoading, } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <Field
                    name="class"
                    label="Type"
                    type="select"
                    component={FormField}
                    options={[
                        {
                            label: "icon",
                            value: "icon"
                        }
                    ]}
                    placeholder={'--- choose ---'}
                />
                <Field
                    name="files"
                    label="Files"
                    type="file"
                    component={FormField}
                    onChange={(e) =>
                        setIsLoading(true).then(() => {
                            uploadFiles(e.target.files, {
                                'class': className,
                            }).then(() => {
                                fetch().then(() => {
                                    addToastNotification({
                                        type: 'success',
                                        title: 'Upload success.',
                                        text: 'Files has been uploaded.',
                                        href: '/media',
                                    })
                                    setIsLoading(false);
                                })

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
