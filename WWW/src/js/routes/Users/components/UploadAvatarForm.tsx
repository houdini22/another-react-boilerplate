import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../components'

class UploadAvatarForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, submit, onChange } = this.props

        return (
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <Field name="avatar" label="File" type="file" component={FormField} onChange={(e) => onChange(e)} />
            </form>
        )
    }
}

export { UploadAvatarForm }
export default { UploadAvatarForm }
