import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

class EditForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, initialValues: { is_name_editable } = {} } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    label="Name"
                    type="text"
                    component={FormField}
                    autoFocus
                    disabled={!is_name_editable}
                />
                <Field name="description" label="Description" type="textarea" component={FormField} />
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
