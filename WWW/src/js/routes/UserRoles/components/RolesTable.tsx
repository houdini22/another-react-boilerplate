import * as React from 'react'
import { Button, Dropdown, Label, Popover, Table } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, RoleIcon } from '../../../components/icons'

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
                                                                            <Dropdown.Item
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
                                                                                                text: 'Role has been deleted from User.',
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
                                                    {role?.permissions?.map(
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
                                                                            <Dropdown.Item
                                                                                color="danger"
                                                                                onClick={() => {
                                                                                    setIsLoading(true)

                                                                                    return deleteRolePermission(role, {
                                                                                        id: _id,
                                                                                    }).then(() => {
                                                                                        fetch().then(() => {
                                                                                            setIsLoading(false)
                                                                                            addToastNotification({
                                                                                                title: 'Delete success.',
                                                                                                text: 'Permission has been deleted.',
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

                                                                                        return deletePermission({
                                                                                            id: _id,
                                                                                        }).then(() => {
                                                                                            fetch().then(() => {
                                                                                                setIsLoading(false)
                                                                                                addToastNotification({
                                                                                                    title: 'Delete success.',
                                                                                                    text: 'Permission has been deleted.',
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
                <Table.TFoot alignRight>
                    <Table.Tr>
                        <Table.Td xs={12}>
                            Records:{' '}
                            <b>
                                {(page - 1) * perPage + 1} - {Math.min(perPage * page, total)} / {total}
                            </b>
                            <br />
                            Total pages: <b>{totalPages}</b>
                        </Table.Td>
                    </Table.Tr>
                </Table.TFoot>
            </Table.Container>
        )
    }
}

export default RolesTable
