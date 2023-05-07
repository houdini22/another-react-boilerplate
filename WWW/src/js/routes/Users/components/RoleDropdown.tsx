import * as React from 'react'
import { Dropdown, Label } from '../../../components'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import { DeleteIcon, EditIcon, PermissionIcon, UserIcon } from '../../../components/icons'
import { Navigate, Role } from '../../../../types.d'
import { RouteManager } from '../../../containers/RouteManager'

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
                                    {canByPermission('users.remove_role') && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Role from User
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
