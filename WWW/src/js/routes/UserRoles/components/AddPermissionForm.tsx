import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../components'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    permissions: Array
    role: any
}

class AddPermissionForm extends React.Component<AddPermissionFormProps> {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, permission, permissions, role } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="permission"
                    label="Permission"
                    type="select"
                    options={[
                        {
                            label: '--- choose ---',
                            value: null,
                        },
                        {
                            label: 'add new',
                            value: 'add',
                        },
                        ...(permissions?.map(({ id, name, guard_name }) => {
                            return {
                                value: id,
                                label: `${name} - ${guard_name}`,
                                disabled: role?.permissions?.find(({ id: _id }) => id === _id),
                            }
                        }) || []),
                    ]}
                    component={FormField}
                />
                {permission === 'add' && (
                    <>
                        <Field name="name" label="Name" type="text" component={FormField} />
                        <Field name="guard_name" label="Guard Name" type="text" component={FormField} />
                    </>
                )}
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddPermissionForm }
export default { EditForm: AddPermissionForm }
