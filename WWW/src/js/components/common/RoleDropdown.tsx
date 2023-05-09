import * as React from 'react'
import { AuthorizationManager, RouteManager } from '../../containers'
import { DeleteIcon, EditIcon, PermissionIcon, RoleIcon, UserIcon } from '../icons'
import { Role } from '../../../types.d'
import SimpleModelCell from './SimpleModelCell'

interface RoleDropdownProps {
    openDeleteModal: () => any
    role: Role
}

export class RoleDropdown extends React.Component<RoleDropdownProps, null> {
    render() {
        const { role, openDeleteModal } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <SimpleModelCell
                                icon={<RoleIcon />}
                                dropdown={[
                                    {
                                        color: 'info',
                                        onClick: () => {
                                            navigate(`/permissions?roles=${role.id}`)
                                        },
                                        children: (
                                            <>
                                                <PermissionIcon /> Show Role Permissions
                                            </>
                                        ),
                                        display: canByPermission('permissions.list'),
                                    },
                                    {
                                        color: 'info',
                                        onClick: () => {
                                            navigate(`/users?roles=${role.id}`)
                                        },
                                        children: (
                                            <>
                                                <UserIcon /> Show Users with Role
                                            </>
                                        ),
                                        display: canByPermission('users.list'),
                                    },
                                    {
                                        color: 'warning',
                                        onClick: () => {
                                            navigate(`/roles/edit?id=${role.id}`)
                                        },
                                        children: (
                                            <>
                                                <EditIcon /> Edit Role
                                            </>
                                        ),
                                        display: canByPermission('roles.edit'),
                                    },
                                    {
                                        color: 'danger',
                                        onClick: () => {
                                            openDeleteModal()
                                        },
                                        children: (
                                            <>
                                                <DeleteIcon /> Remove Role from User
                                            </>
                                        ),
                                        display: role.hasUser && canByPermission('users.remove_role'),
                                    },
                                    {
                                        color: 'danger',
                                        onClick: () => {},
                                        children: (
                                            <>
                                                <DeleteIcon /> Remove Permission from Role
                                            </>
                                        ),
                                        display: role.hasPermission && canByPermission('roles.remove_permission'),
                                    },
                                ]}
                            >
                                {role.name}
                            </SimpleModelCell>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default RoleDropdown
