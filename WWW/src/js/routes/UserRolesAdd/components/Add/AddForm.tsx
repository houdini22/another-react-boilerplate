import * as React from 'react'
import { Field } from 'redux-form'
import { Alert, Button, Card, Col, FormField, Row, Section, Tabs } from '../../../../components'
import { sortPermissionsByNameAscending } from '../../../../helpers/permissions'
import { sortUsersByNameAscending } from '../../../../helpers/users'
import { AddPermission } from '../../../UsersPermissionsAdd/components/Add/Index'
import SimpleModelCell from '../../../../components/common/SimpleModelCell'
import { PermissionIcon, RoleIcon, UserIcon } from '../../../../components/icons'

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
            setIsLoading,
            addPermission,
            isLoading,
            addToastNotification,
            fetchPermissions,
            noAddToUsers,
            canByPermission,
        } = this.props

        return (
            <Tabs.Container
                size={'lg'}
                color={'success'}
                solid
                block
                header={
                    <h1>
                        <RoleIcon /> Add Role
                    </h1>
                }
            >
                <Tabs.Tab name={'role'}>
                    <Tabs.Trigger>
                        <RoleIcon /> Role
                    </Tabs.Trigger>
                    <Tabs.Content>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={6}>
                                    <Card header={<h1>Role</h1>} color={'primary'}>
                                        <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                                        <Field name="description" label="Description" type="textarea" component={FormField} />
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <div>
                                        {!noAddToUsers && canByPermission('users.add_permission') && (
                                            <Card
                                                header={
                                                    <h1>
                                                        <UserIcon /> Add to Users
                                                    </h1>
                                                }
                                                color={'secondary'}
                                            >
                                                <Field
                                                    name="_users"
                                                    label="User"
                                                    type="select"
                                                    placeholder={`--- choose ---`}
                                                    options={sortUsersByNameAscending(users).map(({ id, name }) => ({
                                                        label: name,
                                                        value: id,
                                                        disabled: !!newRoleUsers.find(({ id: _id }) => id === _id),
                                                    }))}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            addNewRoleToUser(users.find((user) => Number(user.id) === Number(value)))
                                                        }
                                                    }}
                                                    component={FormField}
                                                />
                                                <Section>
                                                    {newRoleUsers.map((user) => {
                                                        return (
                                                            <SimpleModelCell
                                                                block
                                                                icon={<UserIcon />}
                                                                key={user.id}
                                                                actions={[
                                                                    {
                                                                        name: 'delete',
                                                                        onClick: () => {
                                                                            removeNewRoleFromUser(user.id)
                                                                        },
                                                                    },
                                                                ]}
                                                            >
                                                                {user.name}
                                                            </SimpleModelCell>
                                                        )
                                                    })}
                                                </Section>
                                            </Card>
                                        )}

                                        {canByPermission('roles.add_permission') && (
                                            <Card
                                                header={
                                                    <h1>
                                                        <PermissionIcon /> Associate Permissions
                                                    </h1>
                                                }
                                                color={'secondary'}
                                            >
                                                <Field
                                                    name="_permissions"
                                                    label="Permission"
                                                    type="select"
                                                    placeholder={`--- choose ---`}
                                                    options={sortPermissionsByNameAscending(permissions).map(({ id, name }) => ({
                                                        label: name,
                                                        value: id,
                                                        disabled: !!newRolePermissions.find(({ id: _id }) => id === _id),
                                                    }))}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            addPermissionToNewRole(
                                                                permissions.find((permission) => Number(permission.id) === Number(value)),
                                                            )
                                                        }
                                                    }}
                                                    component={FormField}
                                                />
                                                <Section>
                                                    {newRolePermissions.map((permission) => {
                                                        return (
                                                            <SimpleModelCell
                                                                block
                                                                icon={<PermissionIcon />}
                                                                key={permission.id}
                                                                actions={[
                                                                    {
                                                                        name: 'delete',
                                                                        onClick: () => {
                                                                            removePermissionFromNewRole(permission.id)
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
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Button color="success" type="submit" block style={{ marginBottom: 30 }}>
                                        <span>Save</span>
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Tabs.Content>
                </Tabs.Tab>
                <Tabs.Tab name={'permissions'}>
                    <Tabs.Trigger>
                        <PermissionIcon /> Permissions
                    </Tabs.Trigger>
                    <Tabs.Content>
                        {canByPermission('permissions.add') && (
                            <AddPermission
                                addPermission={(values) => {
                                    return new Promise((resolve, reject) => {
                                        return addPermission(values).then(
                                            (permission) => {
                                                fetchPermissions().then(
                                                    () => {
                                                        addPermissionToNewRole(permission)
                                                        resolve(permission)
                                                    },
                                                    () => {
                                                        reject()
                                                    },
                                                )
                                            },
                                            (response) => {
                                                reject(response)
                                            },
                                        )
                                    })
                                }}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                addToastNotification={addToastNotification}
                                noAddToUsers
                                noRoleId
                                fullWidth
                            />
                        )}
                    </Tabs.Content>
                </Tabs.Tab>
            </Tabs.Container>
        )
    }
}

export { AddForm }
export default { AddForm }
