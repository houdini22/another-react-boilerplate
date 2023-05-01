import * as React from 'react'
import { Button, Dropdown, Label, Popover, Table, Typography } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, RoleIcon, InfoIcon, DetailsIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'

interface RolesTableProps {}

export class RolesTable extends React.Component<RolesTableProps> {
    render() {
        const {
            setIsLoading,
            roles,
            fetch,
            addToastNotification,
            deleteRolePermission,
            deleteUserRole,
            deletePermission,
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
                    {roles.map((role) => {
                        return (
                            <Table.Tr key={role.id}>
                                <Table.Td xs={1}>{role.id}</Table.Td>
                                <Table.Td xs={3}>{role.name}</Table.Td>
                                <Table.Td xs={4}>
                                    <div>
                                        {role.users_count > 0 && (
                                            <Popover.Container
                                                trigger={'hover'}
                                                pixelsWidth={300}
                                                placement={'left-center'}
                                            >
                                                <Popover.Trigger>
                                                    <Button
                                                        color={'info'}
                                                        icon={<UserIcon />}
                                                        onClick={() => navigate(`/users?roles=${role.id}`)}
                                                    >
                                                        {role.users_count}
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content scrollY>
                                                    <Typography.Container>
                                                        <h4>Users</h4>
                                                    </Typography.Container>
                                                    {role?.users
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
                                                                                <DeleteIcon /> Edit User
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                color="danger"
                                                                                onClick={() => {
                                                                                    setIsLoading(true)

                                                                                    return deleteUserRole(role, {
                                                                                        id: _id,
                                                                                    }).then(() => {
                                                                                        fetch().then(() => {
                                                                                            setIsLoading(false)
                                                                                            addToastNotification({
                                                                                                title: 'Delete success.',
                                                                                                text: 'Role has been removed from User.',
                                                                                                type: 'success',
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <DeleteIcon /> Remove from User
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Container>
                                                                </div>
                                                            )
                                                        })}
                                                </Popover.Content>
                                            </Popover.Container>
                                        )}
                                        {role.permissions_count > 0 && (
                                            <Popover.Container
                                                trigger={'hover'}
                                                pixelsWidth={300}
                                                placement={'left-center'}
                                            >
                                                <Popover.Trigger>
                                                    <Button
                                                        color={'info'}
                                                        icon={<RoleIcon />}
                                                        onClick={() => navigate(`/permissions?roles=${role.id}`)}
                                                    >
                                                        {role.permissions_count}
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content scrollY>
                                                    <Typography.Container>
                                                        <h4>Permissions</h4>
                                                    </Typography.Container>
                                                    {role?.permissions
                                                        ?.sort(({ name: nameA }, { name: nameB }) =>
                                                            nameA.localeCompare(nameB),
                                                        )
                                                        ?.map(
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
                                                                                    <InfoIcon /> Permission ID: {_id}
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                    color={'info'}
                                                                                    onClick={() => {
                                                                                        navigate(
                                                                                            `/users?permissions=${_id}`,
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <UserIcon /> Show Users
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                    color={'info'}
                                                                                    onClick={() => {
                                                                                        navigate(
                                                                                            `/roles?permissions=${_id}`,
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <UserIcon /> Show Roles
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                    color="danger"
                                                                                    onClick={() => {
                                                                                        setIsLoading(true)

                                                                                        return deleteRolePermission(
                                                                                            role,
                                                                                            {
                                                                                                id: _id,
                                                                                            },
                                                                                        ).then(() => {
                                                                                            fetch().then(() => {
                                                                                                setIsLoading(false)
                                                                                                addToastNotification({
                                                                                                    title: 'Delete success.',
                                                                                                    text: 'Permission has been removed from Role.',
                                                                                                    type: 'success',
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <DeleteIcon /> Remove from Role
                                                                                </Dropdown.Item>
                                                                                {_is_deletable == 1 && (
                                                                                    <Dropdown.Item
                                                                                        color="danger"
                                                                                        onClick={() => {
                                                                                            setIsLoading(true)

                                                                                            return deletePermission(
                                                                                                _id,
                                                                                            ).then(() => {
                                                                                                fetch().then(() => {
                                                                                                    setIsLoading(false)
                                                                                                    addToastNotification(
                                                                                                        {
                                                                                                            title: 'Delete success.',
                                                                                                            text: 'Permission has been removed.',
                                                                                                            type: 'success',
                                                                                                        },
                                                                                                    )
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
                                            onClick={() => navigate(`/roles/edit?id=${role.id}`)}
                                        />
                                        {role.is_deletable == 1 && (
                                            <Button
                                                icon={<DeleteIcon />}
                                                iconOnly
                                                color={'danger'}
                                                onClick={() => openDeleteModal(role.id)}
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

export default RolesTable
