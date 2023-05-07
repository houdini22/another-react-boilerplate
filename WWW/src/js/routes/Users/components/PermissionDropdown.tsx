import * as React from 'react'
import { Dropdown, Label } from '../../../components'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import { DeleteIcon, PermissionIcon, RoleIcon, UserIcon } from '../../../components/icons'
import { Navigate, Permission } from '../../../../types.d'
import { RouteManager } from '../../../containers/RouteManager'

interface PermissionDropdownProps {
    openDeleteModal?: () => any
    permission: Permission
}

export class PermissionDropdown extends React.Component<PermissionDropdownProps, null> {
    render() {
        const { permission, openDeleteModal } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <Dropdown.Container triggerSize={'lg'} key={permission.id}>
                                <Dropdown.Trigger size="lg" componentProps={{ block: true }} component={Label}>
                                    {permission.name} {permission.occurrence > 1 && `(${permission.occurrence})`}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    {canByPermission('roles.list') && (
                                        <Dropdown.Item
                                            color={'info'}
                                            onClick={() => {
                                                navigate(`/roles?permissions=${permission.id}`)
                                            }}
                                        >
                                            <RoleIcon /> Show Roles with Permission
                                        </Dropdown.Item>
                                    )}
                                    {canByPermission('users.list') && (
                                        <Dropdown.Item
                                            color={'info'}
                                            onClick={() => {
                                                navigate(`/users?permissions=${permission.id}`)
                                            }}
                                        >
                                            <UserIcon /> Show Users with Permission
                                        </Dropdown.Item>
                                    )}
                                    {canByPermission('permissions.edit') && (
                                        <Dropdown.Item
                                            color={'warning'}
                                            onClick={() => {
                                                navigate(`/permissions/edit?id=${permission.id}`)
                                            }}
                                        >
                                            <PermissionIcon /> Edit Permission
                                        </Dropdown.Item>
                                    )}
                                    {permission.hasUser && canByPermission('users.remove_permission') && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Permission from User
                                        </Dropdown.Item>
                                    )}
                                    {permission.hasRole && canByPermission('roles.remove_permission') && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Permission from Role
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default PermissionDropdown
