import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField, LoadingOverlay } from '../../../components'

class FileDetailsForm extends React.Component<null, null> {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, isLoading } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                {isLoading && <LoadingOverlay />}
                <Field name="alt" label="Alternative text" type="textarea" component={FormField} />
                <Field name="title" label="Title" type="text" component={FormField} />
                <Field name="caption" label="Caption" type="textarea" component={FormField} />
                <Field name="description" label="Description" type="textarea" component={FormField} />
                <Field name="download_url" label="Download URL" type="text" component={FormField} disabled />
                <Field name="preview_url" label="Preview URL" type="text" component={FormField} disabled />
                <Button block type={'submit'}>
                    <span></span>
                </Button>
            </form>
        )
    }
}

export { FileDetailsForm }
export default { FileDetailsForm }
