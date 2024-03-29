import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

class EditForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, canByPermission } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Name" type="text" component={FormField} />
                <Field name="email" label="Email" type="text" component={FormField} />
                <Field name="password" label="Password" type="password" component={FormField} />
                <Field name="password_confirmation" label="Confirm password" type="password" component={FormField} />
                {canByPermission('users.change_status') && (
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
                )}
                <Button color="success" type="submit" block>
                    <span>Save</span>
                </Button>
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
