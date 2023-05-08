import * as React from 'react'
import { Dropdown, Label } from '../../../components'
import { AuthorizationManager, RouteManager } from '../../../containers'
import { DeleteIcon, EditIcon, FileIcon, InfoIcon, PermissionIcon, RoleIcon } from '../../../components/icons'
import { User } from '../../../../types.d'

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
                            <Dropdown.Container triggerSize={'lg'}>
                                <Dropdown.Trigger size="lg" component={Label} componentProps={{ block: true }}>
                                    {user.name}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item type={'header'}>
                                        <InfoIcon /> User ID: {user.id}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'info'}
                                        onClick={() => {
                                            navigate(`/permissions?user=${user.name}`)
                                        }}
                                    >
                                        <PermissionIcon /> Show User Permissions
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'info'}
                                        onClick={() => {
                                            navigate(`/roles?user=${user.name}`)
                                        }}
                                    >
                                        <RoleIcon /> Show User Roles
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'info'}
                                        onClick={() => {
                                            navigate(`/media?user=${user.name}`)
                                        }}
                                    >
                                        <FileIcon /> Show User Media
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        color={'warning'}
                                        onClick={() => {
                                            navigate(`/users/edit?id=${user.id}`)
                                        }}
                                    >
                                        <EditIcon /> Edit User
                                    </Dropdown.Item>
                                    {user.hasRole && canByPermission('users.remove_permission') && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Role from User
                                        </Dropdown.Item>
                                    )}
                                    {user.hasPermission && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                openDeleteModal()
                                            }}
                                        >
                                            <DeleteIcon /> Remove Permission from User
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

export default UserDropdown
