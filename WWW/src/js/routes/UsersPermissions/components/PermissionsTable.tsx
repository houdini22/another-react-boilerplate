import * as React from 'react'
import { Button, Table, Tooltip } from '../../../components'
import { UserIcon, RoleIcon, DescriptionIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import { DeletePermission, DeleteRolePermission, DeleteUserPermission, DeleteUserRole, Permission, SetIsLoading } from '../../../../types.d'
import { ButtonEdit } from '../../../components/common/ButtonEdit'
import { ButtonDelete } from '../../../components/common/ButtonDelete'
import { RouteManager, AuthorizationManager, NotificationsManager } from '../../../containers'
import { ModalManager } from '../../../components/ui/Modal'
import RowExpandRoles from './PermissionsTable/RowExpandRoles'
import RowExpandUsers from './PermissionsTable/RowExpandUsers'

interface RolesTableProps {
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    deletePermission: DeletePermission
    fetch: () => Promise<void>
    page: number
    perPage: number
    total: number
    totalPages: number
    deleteRolePermission: DeleteRolePermission
    deleteUserPermission: DeleteUserPermission
    data: Array<Permission>
}

export class PermissionsTable extends React.Component<RolesTableProps, null> {
    render() {
        const { setIsLoading, deleteUserPermission, fetch, deletePermission, page, perPage, total, totalPages, deleteRolePermission, data } =
            this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <ModalManager>
                                {({ registerModal, openModal, closeModal }) => (
                                    <NotificationsManager>
                                        {({ addToastNotification }) => (
                                            <Table.Container bordered striped>
                                                <Table.THead>
                                                    <Table.Tr>
                                                        <Table.Th xs={1}></Table.Th>
                                                        <Table.Th xs={5}>Name</Table.Th>
                                                        <Table.Th xs={4} alignRight>
                                                            <span>Resources</span>
                                                        </Table.Th>
                                                        <Table.Th xs={2}>Actions</Table.Th>
                                                    </Table.Tr>
                                                </Table.THead>
                                                <Table.TBody>
                                                    {data?.map((permission: Permission) => {
                                                        if (permission.is_deletable) {
                                                            registerModal(
                                                                `user-permission-${permission.id}-delete`,
                                                                <ModalConfirm
                                                                    onConfirm={() => {
                                                                        setIsLoading(true).then(() => {
                                                                            deletePermission(permission).then(
                                                                                () => {
                                                                                    fetch().then(
                                                                                        () => {
                                                                                            closeModal(`user-permission-${permission.id}-delete`)
                                                                                            addToastNotification({
                                                                                                title: 'Remove success.',
                                                                                                text: `Permission ID: ${permission.id} has been removed.`,
                                                                                                type: 'success',
                                                                                                href: `/permissions`,
                                                                                            })
                                                                                            setIsLoading(false)
                                                                                        },
                                                                                        () => {
                                                                                            closeModal(`user-permission-${permission.id}-delete`)
                                                                                            setIsLoading(false)
                                                                                        },
                                                                                    )
                                                                                },
                                                                                () => {
                                                                                    closeModal(`user-permission-${permission.id}-delete`)
                                                                                    setIsLoading(false)
                                                                                },
                                                                            )
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
                                                                {({ addExpand, expand, collapse }) => {
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

                                                                    if (permission.roles_count === 0) {
                                                                        collapse('roles')
                                                                    }
                                                                    if (permission.users_count === 0) {
                                                                        collapse('users')
                                                                    }

                                                                    return (
                                                                        <Table.Tr key={permission.id}>
                                                                            <Table.Td xs={1}>{permission.id}</Table.Td>
                                                                            <Table.Td xs={5}>
                                                                                <div>
                                                                                    {permission.name}{' '}
                                                                                    {!!permission.description && (
                                                                                        <Tooltip
                                                                                            color={'primary'}
                                                                                            tooltip={
                                                                                                <span
                                                                                                    style={{
                                                                                                        maxWidth: 300,
                                                                                                        display: 'block',
                                                                                                    }}
                                                                                                >
                                                                                                    {permission.description}
                                                                                                </span>
                                                                                            }
                                                                                        >
                                                                                            <Button
                                                                                                icon={<DescriptionIcon />}
                                                                                                iconOnly
                                                                                                color={'info'}
                                                                                            />
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </div>
                                                                            </Table.Td>
                                                                            <Table.Td xs={4} alignRight>
                                                                                <div>
                                                                                    {permission.roles_count > 0 &&
                                                                                        canByPermission('roles.list_permissions') && (
                                                                                            <Tooltip tooltip={`Roles with Permission`}>
                                                                                                <Button
                                                                                                    color={'info'}
                                                                                                    icon={<RoleIcon />}
                                                                                                    onClick={() => expand('roles')}
                                                                                                >
                                                                                                    <span>{permission.roles_count}</span>
                                                                                                </Button>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                    {permission.users_count > 0 &&
                                                                                        canByPermission('users.list_permissions') && (
                                                                                            <Tooltip tooltip={`Users with Permission`}>
                                                                                                <Button
                                                                                                    color={'info'}
                                                                                                    icon={<UserIcon />}
                                                                                                    onClick={() => expand('users')}
                                                                                                >
                                                                                                    <span>{permission.users_count}</span>
                                                                                                </Button>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                </div>
                                                                            </Table.Td>
                                                                            <Table.Td xs={2}>
                                                                                <div>
                                                                                    {canByPermission('permissions.edit') && (
                                                                                        <ButtonEdit href={`/permissions/edit?id=${permission.id}`} />
                                                                                    )}
                                                                                    {permission.is_deletable == 1 &&
                                                                                        canByPermission('permissions.delete') && (
                                                                                            <ButtonDelete
                                                                                                onClick={() => {
                                                                                                    openModal(
                                                                                                        `user-permission-${permission.id}-delete`,
                                                                                                    )
                                                                                                }}
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
                                                <Table.TFoot alignRight>
                                                    <Table.Tr>
                                                        <Table.Td xs={12}>
                                                            <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.TFoot>
                                            </Table.Container>
                                        )}
                                    </NotificationsManager>
                                )}
                            </ModalManager>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default PermissionsTable
