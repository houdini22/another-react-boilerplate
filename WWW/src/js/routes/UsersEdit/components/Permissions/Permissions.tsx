import * as React from 'react'
import { Badge, Card, Label, LoadingOverlay, Tabs } from '../../../../components'
import { mergeUserPermissions, sortPermissionsByNameAscending, userPermissionFromRoles } from '../../../../helpers/permissions'
import { Permission, User } from '../../../../../types.d'
import PermissionDropdown from '../../../../components/common/PermissionDropdown'
import ModalDeleteUserPermission from '../../../../components/common/ModalDeleteUserPermission'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deletePermission: Function
    fetchOne: Function
    user: User
    isLoading: boolean
}

export class Permissions extends React.Component<AddRoleProps, null> {
    render() {
        const { setIsLoading, fetchOne, user, isLoading, deleteUserPermission, openModal, closeModal, registerModal } = this.props

        const allPermissions = mergeUserPermissions(user)
        const permissionsFromRoles = userPermissionFromRoles(user)

        user?.permissions?.forEach((permission: Permission) => {
            registerModal(
                `user-delete-permission-from-user-${permission.id}`,
                <ModalDeleteUserPermission
                    permission={permission}
                    setIsLoading={setIsLoading}
                    deleteUserPermission={deleteUserPermission}
                    user={user}
                    fetch={() => fetchOne(user['id'])}
                    closeModal={() => closeModal(`user-delete-permission-from-user-${permission.id}`)}
                />,
            )
        })

        const _allPermissions = Object.keys(allPermissions).map((key) => allPermissions[key])

        const _permissionsFromRoles = Object.keys(permissionsFromRoles).map((key) => permissionsFromRoles[key])

        return (
            <Card header={<h1>Permissions</h1>} color={'secondary'}>
                <Tabs.Container>
                    <Tabs.Tab name={'all'}>
                        <Tabs.Trigger>
                            All Permissions <Badge color={'info'}>{Object.keys(allPermissions).length}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {sortPermissionsByNameAscending(_allPermissions).map((permission: Permission) => {
                                return (
                                    <PermissionDropdown
                                        key={permission.id}
                                        permission={{
                                            ...permission,
                                        }}
                                    />
                                )
                            })}
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name={'from_roles'}>
                        <Tabs.Trigger>
                            From Roles <Badge color={'info'}>{Object.keys(permissionsFromRoles).length}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {sortPermissionsByNameAscending(_permissionsFromRoles).map((permission: Permission) => {
                                return <PermissionDropdown key={permission.id} permission={permission} />
                            })}
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name={'direct_permissions'}>
                        <Tabs.Trigger>
                            Direct Permissions <Badge color={'info'}>{user?.permissions?.length || 0}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {sortPermissionsByNameAscending(user?.permissions).map((permission: Permission) => {
                                return (
                                    <PermissionDropdown
                                        key={permission.id}
                                        permission={{
                                            ...permission,
                                            hasUser: true,
                                        }}
                                        openDeleteModal={() => openModal(`user-delete-permission-from-user-${permission.id}`)}
                                    />
                                )
                            })}
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Permissions
