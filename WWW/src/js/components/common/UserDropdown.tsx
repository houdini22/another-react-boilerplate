import * as React from 'react'
import { AuthorizationManager, RouteManager } from '../../containers'
import { DeleteIcon, EditIcon, FileIcon, PermissionIcon, RoleIcon } from '../icons'
import { User } from '../../../types.d'
import SimpleModelCell from './SimpleModelCell'

interface UserDropdownProps {
    openDeleteModal?: () => any
    user: User
}

export class UserDropdown extends React.Component<UserDropdownProps, null> {
    render() {
        const { user, openDeleteModal } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <SimpleModelCell
                                icon={<PermissionIcon />}
                                dropdown={[
                                    {
                                        color: 'info',
                                        onClick: () => {
                                            navigate(`/permissions?user=${user.name}`)
                                        },
                                        children: (
                                            <>
                                                <PermissionIcon /> Show User Permissions
                                            </>
                                        ),
                                        display: canByPermission('permissions.list'),
                                    },
                                    {
                                        color: 'info',
                                        onClick: () => {
                                            navigate(`/roles?user=${user.name}`)
                                        },
                                        children: (
                                            <>
                                                <RoleIcon /> Show User Roles
                                            </>
                                        ),
                                        display: canByPermission('roles.list'),
                                    },
                                    {
                                        color: 'info',
                                        onClick: () => {
                                            navigate(`/media?user=${user.name}`)
                                        },
                                        children: (
                                            <>
                                                <FileIcon /> Show User Media
                                            </>
                                        ),
                                        display: canByPermission('media.list'),
                                    },
                                    {
                                        color: 'warning',
                                        onClick: () => {
                                            navigate(`/users/edit?id=${user.id}`)
                                        },
                                        children: (
                                            <>
                                                <EditIcon /> Edit User
                                            </>
                                        ),
                                        display: canByPermission('users.edit'),
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
                                        display: user.hasRole && canByPermission('users.remove_permission'),
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
                                        display: user.hasPermission && canByPermission('users.remove_permission'),
                                    },
                                ]}
                            >
                                {user.name}
                            </SimpleModelCell>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default UserDropdown
