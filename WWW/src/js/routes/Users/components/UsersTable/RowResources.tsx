import * as React from 'react'
import { Button, Tooltip } from '../../../../components'
import { FileIcon, PermissionIcon, RoleIcon } from '../../../../components/icons'
import { DeleteUserAvatar, ExpandRow, SetIsLoading, User } from '../../../../../types.d'
import RowResourcesAvatarDropdown from './RowResourcesAvatarDropdown'
import { RouteManager, AuthorizationManager } from '../../../../containers'

interface RowResourcesProps {
    user: User
    permissionsFromRoles: Object
    expand: ExpandRow
    deleteAvatar: DeleteUserAvatar
    setIsLoading: SetIsLoading
    fetch: () => Promise<void>
}

export class RowResources extends React.Component<RowResourcesProps, null> {
    render() {
        const { user, permissionsFromRoles, expand, deleteAvatar, setIsLoading, fetch, collapse } = this.props

        if (user?.roles?.length === 0) {
            collapse('roles')
        }
        if (Object.keys(permissionsFromRoles).length + user.permissions.length === 0) {
            collapse('permissions')
        }

        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <div>
                                {user?.roles?.length > 0 && canByPermission('users.list_roles') && (
                                    <Tooltip tooltip={`User Roles`}>
                                        <Button
                                            color={'info'}
                                            icon={<RoleIcon />}
                                            onClick={() => {
                                                expand('roles')
                                            }}
                                        >
                                            <span>{user?.roles?.length || 0}</span>
                                        </Button>
                                    </Tooltip>
                                )}
                                {Object.keys(permissionsFromRoles).length + user.permissions.length && canByPermission('users.list_permissions') && (
                                    <Tooltip tooltip={`User Permissions`}>
                                        <Button
                                            color={'info'}
                                            icon={<PermissionIcon />}
                                            onClick={() => {
                                                expand('permissions')
                                            }}
                                        >
                                            <span> {Object.keys(permissionsFromRoles).length + user.permissions.length || 0}</span>
                                        </Button>
                                    </Tooltip>
                                )}
                                {user.files_count > 0 && canByPermission('users.list_files') && (
                                    <Button color={'info'} icon={<FileIcon />} onClick={() => navigate(`/media?user=${user.name}`)}>
                                        <span>{user.files_count}</span>
                                    </Button>
                                )}
                                <RowResourcesAvatarDropdown user={user} deleteAvatar={deleteAvatar} setIsLoading={setIsLoading} fetch={fetch} />
                            </div>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default RowResources
