import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

class EditForm extends React.Component<null, null> {
    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                <Field name="guard_name" label="Guard" type="hidden" inputOnly component={FormField} />
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
