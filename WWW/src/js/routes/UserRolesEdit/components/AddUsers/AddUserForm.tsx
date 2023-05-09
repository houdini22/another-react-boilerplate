import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'
import { Permission, Role } from '../../../../../types.d'
import { sortUsersByNameAscending } from '../../../../helpers/users'

interface AddUsersFormProps {
    handleSubmit: Function
    permission: string
    permissions: Array<Permission>
    role: any
    roles: Array<Role>
}

class AddUserForm extends React.Component<AddUsersFormProps, null> {
    render() {
        const { handleSubmit, users, role } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="user_id"
                    label="User"
                    type="select"
                    placeholder={`--- choose ---`}
                    options={sortUsersByNameAscending(users).map(({ id, name }) => ({
                        label: name,
                        value: id,
                        disabled: !!role?.users?.find(({ id: _id }) => id === _id),
                    }))}
                    component={FormField}
                />
                <Button color="success" type="submit" block>
                    <span>Save</span>
                </Button>
            </form>
        )
    }
}

export { AddUserForm }
export default { AddUserForm }
