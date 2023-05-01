import * as React from 'react'
import { Button, Dropdown, Label, Table } from '../../../components'
import { EditIcon, DeleteIcon } from '../../../components/icons'
import { TFoot } from '../../../components/ui/Table'

interface RolesTableProps {}

export class RolesTable extends React.Component<RolesTableProps> {
    render() {
        const {
            setIsLoading,
            roles,
            fetch,
            addToastNotification,
            deleteUserPermission,
            deletePermission,
            openDeleteModal,
            openEditModal,
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
                        <Table.Th xs={2}>Name</Table.Th>
                        <Table.Th xs={1}>Users</Table.Th>
                        <Table.Th xs={2}>Permissions Count</Table.Th>
                        <Table.Th xs={3}>Permissions</Table.Th>
                        <Table.Th xs={3}>Actions</Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {roles.map((role) => {
                        return (
                            <Table.Tr key={role.id}>
                                <Table.Td xs={1}>{role.id}</Table.Td>
                                <Table.Td xs={2}>{role.name}</Table.Td>
                                <Table.Td xs={1}>{role.users_count}</Table.Td>
                                <Table.Td xs={2}>{role.permissions_count}</Table.Td>
                                <Table.Td xs={3}>
                                    <div>
                                        {role?.permissions?.map(
                                            ({ id: _id, name, guard_name, is_deletable: _is_deletable }) => {
                                                return (
                                                    <div key={name}>
                                                        <Dropdown.Container size={'sm'} triggerSize={'lg'}>
                                                            <Dropdown.Trigger size="lg" component={Label}>
                                                                {name} - {guard_name}
                                                            </Dropdown.Trigger>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                    color="danger"
                                                                    onClick={() => {
                                                                        setIsLoading(true)

                                                                        return deleteUserPermission(role, {
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
                                    </div>
                                </Table.Td>
                                <Table.Td xs={3}>
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