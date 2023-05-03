import * as React from 'react'
import { Field } from 'redux-form'
import { Alert, Button, Card, FormField, Section } from '../../../../components'

class AddForm extends React.Component<null, null> {
    render() {
        const {
            handleSubmit,
            permissions,
            newRolePermissions,
            addPermissionToNewRole,
            removePermissionFromNewRole,
            users,
            newRoleUsers,
            addNewRoleToUser,
            removeNewRoleFromUser,
        } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                <Field name="guard_name" label="Guard" type="hidden" inputOnly component={FormField} />
                <Card header={<h1>Add Permissions</h1>}>
                    {newRolePermissions.length > 0 && <Alert color={'info'}>Click added Permission to remove.</Alert>}
                    <Field
                        name="_permissions"
                        label="Permission"
                        type="select"
                        placeholder={`--- choose ---`}
                        options={permissions
                            .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id, name }) => ({
                                label: name,
                                value: id,
                                disabled: !!newRolePermissions.find(({ id: _id }) => id === _id),
                            }))}
                        onChange={(e, value) => {
                            addPermissionToNewRole(
                                permissions.find((permission) => Number(permission.id) === Number(value)),
                            )
                        }}
                        component={FormField}
                    />
                    <Section>
                        {newRolePermissions.map((permission) => {
                            return (
                                <Button
                                    key={permission.id}
                                    roundless
                                    color={'secondary'}
                                    block
                                    onClick={() => {
                                        removePermissionFromNewRole(permission.id)
                                    }}
                                >
                                    {permission.name}
                                </Button>
                            )
                        })}
                    </Section>
                </Card>
                <Card header={<h1>Add to Users</h1>}>
                    {newRoleUsers.length > 0 && <Alert color={'info'}>Click added User to remove.</Alert>}
                    <Field
                        name="_users"
                        label="User"
                        type="select"
                        placeholder={`--- choose ---`}
                        options={users
                            .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id, name }) => ({
                                label: name,
                                value: id,
                                disabled: !!newRoleUsers.find(({ id: _id }) => id === _id),
                            }))}
                        onChange={(e, value) => {
                            addNewRoleToUser(users.find((user) => Number(user.id) === Number(value)))
                        }}
                        component={FormField}
                    />
                    <Section>
                        {newRoleUsers.map((user) => {
                            return (
                                <Button
                                    key={user.id}
                                    roundless
                                    color={'secondary'}
                                    block
                                    onClick={() => {
                                        removeNewRoleFromUser(user.id)
                                    }}
                                >
                                    {user.name}
                                </Button>
                            )
                        })}
                    </Section>
                </Card>
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddForm }
export default { AddForm }
