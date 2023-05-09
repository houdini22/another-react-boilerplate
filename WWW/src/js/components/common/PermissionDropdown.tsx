import * as React from 'react'
import { AuthorizationManager, RouteManager } from '../../containers'
import { DeleteIcon, EditIcon, PermissionIcon, RoleIcon, UserIcon } from '../icons'
import { Permission } from '../../../types.d'
import SimpleModelCell from './SimpleModelCell'

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
                            <SimpleModelCell
                                block
                                icon={<PermissionIcon />}
                                dropdown={[
                                    {
                                        color: 'primary',
                                        onClick: () => {
                                            navigate(`/roles?permissions=${permission.id}`)
                                        },
                                        children: (
                                            <>
                                                {' '}
                                                <RoleIcon /> Show Roles with Permission
                                            </>
                                        ),
                                        display: canByPermission('roles.list'),
                                    },
                                    {
                                        color: 'primary',
                                        onClick: () => {
                                            navigate(`/users?permissions=${permission.id}`)
                                        },
                                        children: (
                                            <>
                                                <UserIcon /> Show Users with Permission
                                            </>
                                        ),
                                        display: canByPermission('users.list'),
                                    },
                                    {
                                        color: 'warning',
                                        onClick: () => {
                                            navigate(`/permissions/edit?id=${permission.id}`)
                                        },
                                        children: (
                                            <>
                                                <EditIcon /> Edit Permission
                                            </>
                                        ),
                                        display: canByPermission('permissions.edit'),
                                    },
                                    {
                                        color: 'danger',
                                        onClick: () => {
                                            openDeleteModal()
                                        },
                                        children: (
                                            <>
                                                <DeleteIcon /> Remove Permission from User
                                            </>
                                        ),
                                        display: permission.hasUser && canByPermission('users.remove_permission'),
                                    },
                                    {
                                        color: 'danger',
                                        onClick: () => {
                                            openDeleteModal()
                                        },
                                        children: (
                                            <>
                                                <DeleteIcon /> Remove Permission from Role
                                            </>
                                        ),
                                        display: permission.hasRole && canByPermission('users.remove_permission'),
                                    },
                                ]}
                            >
                                {permission.name}
                            </SimpleModelCell>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default PermissionDropdown
