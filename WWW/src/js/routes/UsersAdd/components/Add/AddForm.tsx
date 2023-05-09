import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Section, Tabs } from '../../../../components'
import { sortRolesByNameAscending } from '../../../../helpers/roles'
import { sortPermissionsByNameAscending } from '../../../../helpers/permissions'
import { AddFormContainer } from '../../../UserRolesAdd/components/Add/AddFormContainer'
import SimpleModelCell from '../../../../components/common/SimpleModelCell'
import { PermissionIcon, RoleIcon, UserIcon } from '../../../../components/icons'

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
            setIsLoading,
            addRole,
            addToastNotification,
            newRolePermissions,
            addPermissionToNewRole,
            removePermissionFromNewRole,
            users,
            newRoleUsers,
            addNewRoleToUser,
            removeNewRoleFromUser,
            addPermission,
            isLoading,
            fetchPermissions,
            fetchRoles,
            clearPermissionsFromNewRole,
            canByPermission,
        } = this.props

        return (
            <Tabs.Container solid color={'success'} header={'Add User'} size={'lg'} rounded>
                <Tabs.Tab name={'user'}>
                    <Tabs.Trigger>User</Tabs.Trigger>
                    <Tabs.Content>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={6}>
                                    <div>
                                        <Card header={<h1>User</h1>} color={'primary'}>
                                            <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                                            <Field name="email" label="Email" type="text" component={FormField} />
                                            <Field name="password" label="Password" type="password" component={FormField} />
                                            <Field name="password_confirmation" label="Confirm password" type="password" component={FormField} />
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
                                        </Card>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div>
                                        {canByPermission('users.add_role') && (
                                            <Card header={<h1>Associate Roles</h1>} size={'md'} color={'secondary'}>
                                                <Field
                                                    name="_roles"
                                                    label="Role"
                                                    type="select"
                                                    placeholder={`--- choose ---`}
                                                    options={sortRolesByNameAscending(roles).map(({ id, name }) => ({
                                                        label: name,
                                                        value: id,
                                                        disabled: !!newUserRoles.find(({ id: _id }) => id === _id),
                                                    }))}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            addRoleToNewUser(roles.find((role) => Number(role.id) === Number(value)))
                                                        }
                                                    }}
                                                    component={FormField}
                                                />
                                                <Section>
                                                    {newUserRoles.map((role) => {
                                                        return (
                                                            <SimpleModelCell
                                                                block
                                                                icon={<RoleIcon />}
                                                                key={role.id}
                                                                actions={[
                                                                    {
                                                                        name: 'delete',
                                                                        onClick: () => {
                                                                            removeRoleFromNewUser(role.id)
                                                                        },
                                                                    },
                                                                ]}
                                                            >
                                                                {role.name}
                                                            </SimpleModelCell>
                                                        )
                                                    })}
                                                </Section>
                                            </Card>
                                        )}

                                        {canByPermission('users.add_permission') && (
                                            <div>
                                                <Card header={<h1>Associate Permissions</h1>} size={'md'} color={'secondary'}>
                                                    <Field
                                                        name="_permissions"
                                                        label="Permission"
                                                        type="select"
                                                        placeholder={`--- choose ---`}
                                                        options={sortPermissionsByNameAscending(permissions).map(({ id, name }) => ({
                                                            label: name,
                                                            value: id,
                                                            disabled: !!newUserPermissions.find(({ id: _id }) => id === _id),
                                                        }))}
                                                        onChange={(e, value) => {
                                                            if (value) {
                                                                addPermissionToNewUser(
                                                                    permissions.find((permission) => Number(permission.id) === Number(value)),
                                                                )
                                                            }
                                                        }}
                                                        component={FormField}
                                                    />
                                                    <Section>
                                                        {newUserPermissions.map((permission) => {
                                                            return (
                                                                <SimpleModelCell
                                                                    block
                                                                    icon={<PermissionIcon />}
                                                                    key={permission.id}
                                                                    actions={[
                                                                        {
                                                                            name: 'delete',
                                                                            onClick: () => {
                                                                                removePermissionFromNewUser(permission.id)
                                                                            },
                                                                        },
                                                                    ]}
                                                                >
                                                                    {permission.name}
                                                                </SimpleModelCell>
                                                            )
                                                        })}
                                                    </Section>
                                                </Card>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            <Button type={'submit'} color={'success'} block>
                                <span>Save</span>
                            </Button>
                        </form>
                    </Tabs.Content>
                </Tabs.Tab>
                {canByPermission('roles.add') && (
                    <Tabs.Tab name={'roles'}>
                        <Tabs.Trigger>Add Role</Tabs.Trigger>
                        <Tabs.Content>
                            <AddFormContainer
                                setIsLoading={setIsLoading}
                                addToastNotification={addToastNotification}
                                permissions={permissions}
                                newRolePermissions={newRolePermissions}
                                addPermissionToNewRole={addPermissionToNewRole}
                                removePermissionFromNewRole={removePermissionFromNewRole}
                                users={users}
                                newRoleUsers={newRoleUsers}
                                addNewRoleToUser={addNewRoleToUser}
                                removeNewRoleFromUser={removeNewRoleFromUser}
                                addPermission={addPermission}
                                isLoading={isLoading}
                                fetchPermissions={fetchPermissions}
                                noAddToUsers
                                save={(values) => {
                                    return new Promise((resolve, reject) => {
                                        return addRole(values, newRolePermissions, []).then(
                                            (role) => {
                                                fetchRoles().then(
                                                    () => {
                                                        clearPermissionsFromNewRole()
                                                        addRoleToNewUser(role)
                                                        resolve(role)
                                                    },
                                                    () => {
                                                        reject()
                                                    },
                                                )
                                            },
                                            () => {
                                                reject()
                                            },
                                        )
                                    })
                                }}
                                canByPermission={canByPermission}
                            />
                        </Tabs.Content>
                    </Tabs.Tab>
                )}
            </Tabs.Container>
        )
    }
}

export { AddForm }

export default AddForm
