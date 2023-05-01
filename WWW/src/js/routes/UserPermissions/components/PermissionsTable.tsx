import * as React from 'react'
import { Button, Dropdown, Label, Popover, Table, Typography } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, RoleIcon, InfoIcon, DetailsIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'

interface RolesTableProps {}

export class PermissionsTable extends React.Component<RolesTableProps> {
    render() {
        const {
            setIsLoading,
            permissions,
            fetch,
            addToastNotification,
            deleteRolePermission,
            deleteUserPermission,
            deletePermission,
            openEditModal,
            openDeleteModal,
            page,
            perPage,
            total,
            totalPages,
            navigate,
        } = this.props

        return (
            <Table.Container bordered striped>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th xs={1}>ID</Table.Th>
                        <Table.Th xs={3}>Name</Table.Th>
                        <Table.Th xs={4}>Resources</Table.Th>
                        <Table.Th xs={4}>Actions</Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {permissions.map((permission) => {
                        return (
                            <Table.Tr key={permission.id}>
                                <Table.Td xs={1}>{permission.id}</Table.Td>
                                <Table.Td xs={3}>{permission.name}</Table.Td>
                                <Table.Td xs={4}>
                                    <div>
                                        {permission.users_count > 0 && (
                                            <Popover.Container
                                                trigger={'hover'}
                                                pixelsWidth={300}
                                                placement={'left-center'}
                                            >
                                                <Popover.Trigger>
                                                    <Button
                                                        color={'info'}
                                                        icon={<UserIcon />}
                                                        onClick={() => navigate(`/users?roles=${permission.id}`)}
                                                    >
                                                        {permission.users_count}
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content scrollY>
                                                    <Typography.Container>
                                                        <h4>Users</h4>
                                                    </Typography.Container>
                                                    {permission?.users
                                                        ?.sort(({ name: nameA }, { name: nameB }) =>
                                                            nameA.localeCompare(nameB),
                                                        )
                                                        .map(({ id: _id, name }) => {
                                                            return (
                                                                <div key={name}>
                                                                    <Dropdown.Container triggerSize={'lg'}>
                                                                        <Dropdown.Trigger
                                                                            size="lg"
                                                                            component={Label}
                                                                            componentProps={{ block: true }}
                                                                        >
                                                                            {name}
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item type={'header'}>
                                                                                <InfoIcon /> User ID: {_id}
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'info'}
                                                                                onClick={() => {
                                                                                    navigate(
                                                                                        `/permissions?user=${name}`,
                                                                                    )
                                                                                }}
                                                                            >
                                                                                <DetailsIcon /> Show Permissions
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'info'}
                                                                                onClick={() => {
                                                                                    navigate(`/roles?user=${name}`)
                                                                                }}
                                                                            >
                                                                                <DetailsIcon /> Show Roles
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'info'}
                                                                                onClick={() => {
                                                                                    navigate(`/media?user=${name}`)
                                                                                }}
                                                                            >
                                                                                <DetailsIcon /> Show Media
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'warning'}
                                                                                onClick={() => {
                                                                                    navigate(`/users/edit?id=${_id}`)
                                                                                }}
                                                                            >
                                                                                <EditIcon /> Edit User
                                                                            </Dropdown.Item>
                                                                            {!!permission.is_deletable && (
                                                                                <Dropdown.Item
                                                                                    color="danger"
                                                                                    onClick={() => {
                                                                                        setIsLoading(true)

                                                                                        return deleteUserPermission(
                                                                                            permission,
                                                                                            {
                                                                                                id: _id,
                                                                                            },
                                                                                        ).then(() => {
                                                                                            fetch().then(() => {
                                                                                                setIsLoading(false)
                                                                                                addToastNotification({
                                                                                                    title: 'Delete success.',
                                                                                                    text: 'Permission has been removed from User.',
                                                                                                    type: 'success',
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <DeleteIcon /> Remove Permission
                                                                                    from User
                                                                                </Dropdown.Item>
                                                                            )}
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Container>
                                                                </div>
                                                            )
                                                        })}
                                                </Popover.Content>
                                            </Popover.Container>
                                        )}
                                        {permission.roles_count > 0 && (
                                            <Popover.Container
                                                trigger={'hover'}
                                                pixelsWidth={300}
                                                placement={'left-center'}
                                            >
                                                <Popover.Trigger>
                                                    <Button
                                                        color={'info'}
                                                        icon={<RoleIcon />}
                                                        onClick={() => navigate(`/roles?permissions=${permission.id}`)}
                                                    >
                                                        {permission.roles_count}
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content scrollY>
                                                    <Typography.Container>
                                                        <h4>Roles</h4>
                                                    </Typography.Container>
                                                    {permission?.roles?.map(
                                                        ({
                                                            id: _id,
                                                            name,
                                                            guard_name,
                                                            is_deletable: _is_deletable,
                                                        }) => {
                                                            return (
                                                                <div key={name}>
                                                                    <Dropdown.Container triggerSize={'lg'}>
                                                                        <Dropdown.Trigger
                                                                            size="lg"
                                                                            component={Label}
                                                                            componentProps={{ block: true }}
                                                                        >
                                                                            {name} - {guard_name}
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item type={'header'}>
                                                                                <InfoIcon /> Role ID: {_id}
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'info'}
                                                                                onClick={() => {
                                                                                    navigate(`/users?roles=${_id}`)
                                                                                }}
                                                                            >
                                                                                <DetailsIcon /> Show Users
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'info'}
                                                                                onClick={() => {
                                                                                    navigate(
                                                                                        `/permissions?roles=${_id}`,
                                                                                    )
                                                                                }}
                                                                            >
                                                                                <DetailsIcon /> Show Permissions
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color={'warning'}
                                                                                onClick={() => {
                                                                                    navigate(`/roles/edit?id=${_id}`)
                                                                                }}
                                                                            >
                                                                                <EditIcon /> Edit Role
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color="danger"
                                                                                onClick={() => {
                                                                                    setIsLoading(true)

                                                                                    return deleteRolePermission(
                                                                                        {
                                                                                            id: _id,
                                                                                        },
                                                                                        permission,
                                                                                    ).then(() => {
                                                                                        fetch().then(() => {
                                                                                            setIsLoading(false)
                                                                                            addToastNotification({
                                                                                                title: 'Delete success.',
                                                                                                text: 'Permission has been removed from user.',
                                                                                                type: 'success',
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <DeleteIcon /> Remove from Role
                                                                            </Dropdown.Item>
                                                                            {!!_is_deletable && (
                                                                                <Dropdown.Item
                                                                                    color="danger"
                                                                                    onClick={() => {
                                                                                        setIsLoading(true)

                                                                                        return deletePermission(
                                                                                            permission.id,
                                                                                        ).then(() => {
                                                                                            fetch().then(() => {
                                                                                                setIsLoading(false)
                                                                                                addToastNotification({
                                                                                                    title: 'Delete success.',
                                                                                                    text: 'Permission has been removed.',
                                                                                                    type: 'success',
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <DeleteIcon /> Delete Permission
                                                                                </Dropdown.Item>
                                                                            )}
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Container>
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </Popover.Content>
                                            </Popover.Container>
                                        )}
                                    </div>
                                </Table.Td>
                                <Table.Td xs={4}>
                                    <div>
                                        <Button
                                            icon={<EditIcon />}
                                            iconOnly
                                            color={'warning'}
                                            onClick={() => openEditModal(permission.id)}
                                        />
                                        {permission.is_deletable == 1 && (
                                            <Button
                                                icon={<DeleteIcon />}
                                                iconOnly
                                                color={'danger'}
                                                onClick={() => openDeleteModal(permission.id)}
                                            />
                                        )}
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        )
                    })}
                </Table.TBody>
                <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
            </Table.Container>
        )
    }
}

export default PermissionsTable
