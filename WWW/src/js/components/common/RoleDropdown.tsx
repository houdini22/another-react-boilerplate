import * as React from 'react'
import { Dropdown, Label } from '../index'
import { AuthorizationManager, RouteManager } from '../../containers'
import { DeleteIcon, EditIcon, PermissionIcon, UserIcon } from '../icons'
import { Role } from '../../../types.d'

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
                            <Dropdown.Container triggerSize={'lg'} key={role.id}>
                                <Dropdown.Trigger size="lg" componentProps={{ block: true }} component={Label}>
                                    {role.name}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        color={'info'}
                                        onClick={() => {
                                            navigate(`/permissions?roles=${role.id}`)
                                        }}
                                    >
                                        <PermissionIcon /> Show Role Permissions
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'info'}
                                        onClick={() => {
                                            navigate(`/users?roles=${role.id}`)
                                        }}
                                    >
                                        <UserIcon /> Show Users with Role
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'warning'}
                                        onClick={() => {
                                            navigate(`/roles/edit?id=${role.id}`)
                                        }}
                                    >
                                        <EditIcon /> Edit Role
                                    </Dropdown.Item>
                                    {role.hasUser && canByPermission('users.remove_role') && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Role from User
                                        </Dropdown.Item>
                                    )}
                                    {role.hasPermission && canByPermission('roles.remove_permission') && (
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

export default RoleDropdown
