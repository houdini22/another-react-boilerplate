import * as React from 'react'
import { Button, Table, Tooltip } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, RoleIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import RowExpandUsers from './PermissionsTable/RowExpandUsers'
import RowExpandRoles from './PermissionsTable/RowExpandRoles'
import { Permission } from '../../../../types.d'

interface PermissionsTableProps {}

export class PermissionsTable extends React.Component<PermissionsTableProps, null> {
    render() {
        const {
            setIsLoading,
            permissions,
            fetch,
            addToastNotification,
            deleteRolePermission,
            deleteUserPermission,
            deletePermission,
            page,
            perPage,
            total,
            totalPages,
            navigate,
            openModal,
            registerModal,
            closeModal,
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
                    {permissions.map((permission: Permission) => {
                        if (permission.is_deletable) {
                            registerModal(
                                `user-permission-${permission.id}-delete`,
                                <ModalConfirm
                                    onConfirm={() => {
                                        setIsLoading(true)
                                        deletePermission(permission.id).then(() => {
                                            fetch().then(() => {
                                                closeModal(`user-permission-${permission.id}-delete`)
                                                addToastNotification({
                                                    title: 'Delete success.',
                                                    text: 'Permission has been removed.',
                                                    type: 'success',
                                                })
                                                setIsLoading(false)
                                            })
                                        })
                                    }}
                                    onCancel={() => closeModal(`user-permission-${permission.id}-delete`)}
                                >
                                    <p>
                                        Are you sure to delete Permission: <b>{permission.name}</b>?
                                    </p>
                                </ModalConfirm>,
                            )
                        }

                        return (
                            <Table.ExpandManager key={`expand-manager-${permission.id}`}>
                                {({ addExpand, expand }) => {
                                    addExpand(
                                        'roles',
                                        <RowExpandRoles
                                            navigate={navigate}
                                            setIsLoading={setIsLoading}
                                            addToastNotification={addToastNotification}
                                            fetch={fetch}
                                            permission={permission}
                                            deleteRolePermission={deleteRolePermission}
                                        />,
                                    )

                                    addExpand(
                                        'users',
                                        <RowExpandUsers
                                            navigate={navigate}
                                            setIsLoading={setIsLoading}
                                            addToastNotification={addToastNotification}
                                            fetch={fetch}
                                            permission={permission}
                                            deleteUserPermission={deleteUserPermission}
                                        />,
                                    )

                                    return (
                                        <Table.Tr key={permission.id}>
                                            <Table.Td xs={1}>{permission.id}</Table.Td>
                                            <Table.Td xs={3}>{permission.name}</Table.Td>
                                            <Table.Td xs={4}>
                                                <div>
                                                    {permission.roles_count > 0 && (
                                                        <Tooltip tooltip={`Roles with permission`}>
                                                            <Button
                                                                color={'info'}
                                                                icon={<RoleIcon />}
                                                                onClick={() => expand('roles')}
                                                            >
                                                                {permission.roles_count}
                                                            </Button>
                                                        </Tooltip>
                                                    )}
                                                    {permission.users_count > 0 && (
                                                        <Tooltip tooltip={`Users with permission`}>
                                                            <Button
                                                                color={'info'}
                                                                icon={<UserIcon />}
                                                                onClick={() => expand('users')}
                                                            >
                                                                {permission.users_count}
                                                            </Button>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </Table.Td>
                                            <Table.Td xs={4}>
                                                <div>
                                                    <Button
                                                        icon={<EditIcon />}
                                                        iconOnly
                                                        color={'warning'}
                                                        onClick={() =>
                                                            navigate(`/permissions/edit?id=${permission.id}`)
                                                        }
                                                    />
                                                    {permission.is_deletable == 1 && (
                                                        <Button
                                                            icon={<DeleteIcon />}
                                                            iconOnly
                                                            color={'danger'}
                                                            onClick={() =>
                                                                openModal(`user-permission-${permission.id}-delete`)
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                }}
                            </Table.ExpandManager>
                        )
                    })}
                </Table.TBody>
                <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
            </Table.Container>
        )
    }
}

export default PermissionsTable
