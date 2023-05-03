import * as React from 'react'
import { Field } from 'redux-form'
import { Alert, Button, Card, Col, FormField, Row, Section } from '../../../../components'

class AddForm extends React.Component<null, null> {
    render() {
        const {
            handleSubmit,
            roles,
            addRoleToNewUser,
            removeRoleFromNewUser,
            permissions,
            addPermissionToNewUser,
            removePermissionFromNewUser,
            newUserPermissions,
            newUserRoles,
        } = this.props

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                                <Field name="email" label="Email" type="text" component={FormField} />
                                <Field name="password" label="Password" type="password" component={FormField} />
                                <Field
                                    name="password_confirmation"
                                    label="Confirm password"
                                    type="password"
                                    component={FormField}
                                />
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
                                <Card header={<h1>Add Roles</h1>}>
                                    {newUserRoles.length > 0 && (
                                        <Alert color={'info'}>Click added Role to remove.</Alert>
                                    )}
                                    <Field
                                        name="_roles"
                                        label="Role"
                                        type="select"
                                        placeholder={`--- choose ---`}
                                        options={roles
                                            .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                                            .map(({ id, name }) => ({
                                                label: name,
                                                value: id,
                                                disabled: !!newUserRoles.find(({ id: _id }) => id === _id),
                                            }))}
                                        onChange={(e, value) => {
                                            addRoleToNewUser(roles.find((role) => Number(role.id) === Number(value)))
                                        }}
                                        component={FormField}
                                    />
                                    <Section>
                                        {newUserRoles.map((role) => {
                                            return (
                                                <Button
                                                    roundless
                                                    color={'secondary'}
                                                    block
                                                    onClick={() => {
                                                        removeRoleFromNewUser(role.id)
                                                    }}
                                                >
                                                    {role.name}
                                                </Button>
                                            )
                                        })}
                                    </Section>
                                </Card>
                                <Card header={<h1>Add Permissions</h1>}>
                                    {newUserPermissions.length > 0 && (
                                        <Alert color={'info'}>Click added Permission to remove.</Alert>
                                    )}
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
                                                disabled: !!newUserPermissions.find(({ id: _id }) => id === _id),
                                            }))}
                                        onChange={(e, value) => {
                                            addPermissionToNewUser(
                                                permissions.find(
                                                    (permission) => Number(permission.id) === Number(value),
                                                ),
                                            )
                                        }}
                                        component={FormField}
                                    />
                                    <Section>
                                        {newUserPermissions.map((permission) => {
                                            return (
                                                <Button
                                                    roundless
                                                    color={'secondary'}
                                                    block
                                                    onClick={() => {
                                                        removePermissionFromNewUser(permission.id)
                                                    }}
                                                >
                                                    {permission.name}
                                                </Button>
                                            )
                                        })}
                                    </Section>
                                </Card>
                                <Button type={'submit'} color={'success'} block>
                                    Save
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

export { AddForm }
export default { EditForm: AddForm }
