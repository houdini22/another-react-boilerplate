import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    roles: Array
    user: any
}

class AddRoleForm extends React.Component<AddPermissionFormProps> {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, roles, user } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="role"
                    label="Role"
                    type="select"
                    options={[
                        {
                            label: '--- choose ---',
                            value: null,
                        },
                        ...(roles?.map(({ id, name, guard_name }) => {
                            return {
                                value: id,
                                label: `${name} - ${guard_name}`,
                                disabled: user?.roles?.find(({ id: _id }) => id === _id),
                            }
                        }) || []),
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

export { AddRoleForm }
export default { EditForm: AddRoleForm }
