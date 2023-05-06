import * as React from 'react'
import { Button, Dropdown, Popover, Tooltip } from '../../../../components'
import { AvatarIcon, FileIcon, PermissionIcon, RoleIcon } from '../../../../components/icons'
import { apiURL } from '../../../../helpers/api'
import { User } from '../../../../../types.d'

interface FiltersProps {
    user: User
    navigate: Function
    expand: Function
}

export class RowResources extends React.Component<FiltersProps, null> {
    render() {
        const { user, permissionsFromRoles, navigate, expand, canByPermissions, deleteAvatar, setIsLoading, fetch } =
            this.props

        return (
            <div>
                {user?.roles?.length > 0 && canByPermissions('users.list_roles') && (
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
                {Object.keys(permissionsFromRoles).length > 0 && canByPermissions('users.list_permissions') && (
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
                {user.files_count > 0 && canByPermissions('users.list_files') && (
                    <Button color={'info'} icon={<FileIcon />} onClick={() => navigate(`/media?user=${user.name}`)}>
                        {user.files_count}
                    </Button>
                )}
                {user?.avatar?.id != null && (
                    <Popover.Container trigger={'hover'} placement={'left-center'}>
                        <Popover.Trigger color={'info'}>
                            <Dropdown.Container>
                                <Dropdown.Trigger
                                    component={Button}
                                    componentProps={{ iconOnly: true, icon: <AvatarIcon /> }}
                                ></Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setIsLoading(true)
                                            deleteAvatar(user).then(() => {
                                                fetch().then(() => {
                                                    setIsLoading(false)
                                                })
                                            })
                                        }}
                                    >
                                        Delete Avatar
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        </Popover.Trigger>
                        <Popover.Content>
                            <a href={apiURL(`files/preview/${user?.avatar?.id}`)} target={'_blank'}>
                                <img
                                    src={apiURL(`files/preview/${user?.avatar?.id}?width=200&height=200`)}
                                    style={{ maxWidth: 200 }}
                                    alt={''}
                                />
                            </a>
                        </Popover.Content>
                    </Popover.Container>
                )}
            </div>
        )
    }
}

export default RowResources
