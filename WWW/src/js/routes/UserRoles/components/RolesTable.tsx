import * as React from 'react'
import { Button, Table, Tooltip } from '../../../components'
import { UserIcon, PermissionIcon, HelpIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import RowExpandPermissions from './RolesTable/RowExpandPermissions'
import RowExpandUsers from './RolesTable/RowExpandUsers'
import { DeleteRole, DeleteRolePermission, DeleteUserRole, Role, SetIsLoading } from '../../../../types.d'
import { ButtonEdit } from '../../../components/common/ButtonEdit'
import { ButtonDelete } from '../../../components/common/ButtonDelete'
import { RouteManager, AuthorizationManager, NotificationsManager } from '../../../containers'
import { ModalManager } from '../../../components/ui/Modal'
import ModalDeleteRole from '../../../components/common/ModalDeleteRole'

interface RolesTableProps {
    roles: Array<Role>
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    deleteRole: DeleteRole
    fetch: () => Promise<void>
    page: number
    perPage: number
    total: number
    totalPages: number
    deleteRolePermission: DeleteRolePermission
}

export class RolesTable extends React.Component<RolesTableProps, null> {
    render() {
        const { setIsLoading, roles, fetch, deleteUserRole, page, perPage, total, totalPages, deleteRole, deleteRolePermission } = this.props

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
                                                        <Table.Th xs={1}>ID</Table.Th>
                                                        <Table.Th xs={3}>Name</Table.Th>
                                                        <Table.Th xs={4}>Resources</Table.Th>
                                                        <Table.Th xs={4}>Actions</Table.Th>
                                                    </Table.Tr>
                                                </Table.THead>
                                                <Table.TBody>
                                                    {roles.map((role: Role) => {
                                                        if (role.is_deletable) {
                                                            const modalName = `user-role-${role.id}-delete`
                                                            registerModal(
                                                                modalName,
                                                                <ModalDeleteRole
                                                                    role={role}
                                                                    deleteRole={deleteRole}
                                                                    fetch={fetch}
                                                                    setIsLoading={setIsLoading}
                                                                    close={() => closeModal(modalName)}
                                                                />,
                                                            )
                                                        }

                                                        return (
                                                            <Table.ExpandManager key={role.id}>
                                                                {({ addExpand, expand, collapse }) => {
                                                                    addExpand(
                                                                        'permissions',
                                                                        <RowExpandPermissions
                                                                            role={role}
                                                                            navigate={navigate}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={fetch}
                                                                            deleteRolePermission={deleteRolePermission}
                                                                        />,
                                                                    )

                                                                    addExpand(
                                                                        'users',
                                                                        <RowExpandUsers
                                                                            role={role}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={fetch}
                                                                            deleteUserRole={deleteUserRole}
                                                                        />,
                                                                    )

                                                                    if (role?.permissions?.length === 0) {
                                                                        collapse('permissions')
                                                                    }
                                                                    if (role?.users?.length === 0) {
                                                                        collapse('users')
                                                                    }

                                                                    return (
                                                                        <Table.Tr key={role.id}>
                                                                            <Table.Td xs={1}>{role.id}</Table.Td>
                                                                            <Table.Td xs={4}>
                                                                                <div>
                                                                                    {role.name}{' '}
                                                                                    {!!role.description && (
                                                                                        <Tooltip
                                                                                            tooltip={
                                                                                                <span
                                                                                                    style={{
                                                                                                        maxWidth: 300,
                                                                                                        display: 'block',
                                                                                                    }}
                                                                                                >
                                                                                                    {role.description}
                                                                                                </span>
                                                                                            }
                                                                                        >
                                                                                            <Button icon={<HelpIcon />} iconOnly color={'info'} />
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </div>
                                                                            </Table.Td>
                                                                            <Table.Td xs={5} alignRight>
                                                                                <div>
                                                                                    {role?.permissions?.length > 0 &&
                                                                                        canByPermission('roles.list_permissions') && (
                                                                                            <Tooltip tooltip={`Role Permissions`}>
                                                                                                <Button
                                                                                                    color={'info'}
                                                                                                    icon={<PermissionIcon />}
                                                                                                    onClick={() => {
                                                                                                        expand('permissions')
                                                                                                    }}
                                                                                                >
                                                                                                    {role?.permissions?.length || 0}
                                                                                                </Button>
                                                                                            </Tooltip>
                                                                                        )}

                                                                                    {role?.users?.length > 0 &&
                                                                                        canByPermission('roles.list_users') && (
                                                                                            <Tooltip tooltip={`Users with Role`}>
                                                                                                <Button
                                                                                                    color={'info'}
                                                                                                    icon={<UserIcon />}
                                                                                                    onClick={() => expand('users')}
                                                                                                >
                                                                                                    {role.users_count}
                                                                                                </Button>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                </div>
                                                                            </Table.Td>
                                                                            <Table.Td xs={2}>
                                                                                <div>
                                                                                    {canByPermission('roles.edit') && (
                                                                                        <ButtonEdit href={`/roles/edit?id=${role.id}`} />
                                                                                    )}
                                                                                    {role.is_deletable && canByPermission('roles.delete') && (
                                                                                        <ButtonDelete
                                                                                            onClick={() => openModal(`user-role-${role.id}-delete`)}
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

export default RolesTable
