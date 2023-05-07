import * as React from 'react'
import { Button, Tooltip } from '../../../../components'
import { FileIcon, PermissionIcon, RoleIcon } from '../../../../components/icons'
import { CanByPermissions, DeleteUserAvatar, ExpandRow, SetIsLoading, User } from '../../../../../types.d'
import RowResourcesAvatarDropdown from './RowResourcesAvatarDropdown'
import { RouteManager } from '../../../../containers/RouteManager'
import { AuthorizationManager } from '../../../../containers/AuthorizationManager'

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
        const { user, permissionsFromRoles, expand, deleteAvatar, setIsLoading, fetch } = this.props

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
                                            {user?.roles?.length || 0}
                                        </Button>
                                    </Tooltip>
                                )}
                                {Object.keys(permissionsFromRoles).length > 0 &&
                                    canByPermission('users.list_permissions') && (
                                        <Tooltip tooltip={`User Permissions`}>
                                            <Button
                                                color={'info'}
                                                icon={<PermissionIcon />}
                                                onClick={() => {
                                                    expand('permissions')
                                                }}
                                            >
                                                {Object.keys(permissionsFromRoles).length || 0}
                                            </Button>
                                        </Tooltip>
                                    )}
                                {user.files_count > 0 && canByPermission('users.list_files') && (
                                    <Button
                                        color={'info'}
                                        icon={<FileIcon />}
                                        onClick={() => navigate(`/media?user=${user.name}`)}
                                    >
                                        {user.files_count}
                                    </Button>
                                )}
                                <RowResourcesAvatarDropdown
                                    user={user}
                                    deleteAvatar={deleteAvatar}
                                    setIsLoading={setIsLoading}
                                    fetch={fetch}
                                />
                            </div>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default RowResources
