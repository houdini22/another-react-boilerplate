import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../components'

class EditForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Name" type="text" component={FormField} />
                <Field name="email" label="Email" type="text" component={FormField} />
                <Field name="password" label="Password" type="password" component={FormField} />
                <Field name="confirm_password" label="Confirm password" type="password" component={FormField} />
                <Field
                    name="status"
                    label="Status"
                    type="select"
                    options={[
                        {
                            label: 'not active',
                            value: 0,
                        },
                        {
                            label: 'active',
                            value: 1,
                        },
                    ]}
                    component={FormField}
                />
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
