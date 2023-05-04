import * as React from 'react'
import { Button, Table, Tooltip } from '../../../components'
import { EditIcon, DeleteIcon, UserIcon, PermissionIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import RowExpandPermissions from './RolesTable/RowExpandPermissions'
import RowExpandUsers from './RolesTable/RowExpandUsers'
import { Role } from '../../../../types.d'

interface RolesTableProps {}

export class RolesTable extends React.Component<RolesTableProps, null> {
    render() {
        const {
            setIsLoading,
            roles,
            fetch,
            addToastNotification,
            deleteUserRole,
            page,
            perPage,
            total,
            totalPages,
            navigate,
            registerModal,
            openModal,
            closeModal,
            deleteRole,
            deleteRolePermission,
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
                    {roles.map((role: Role) => {
                        if (role.is_deletable) {
                            registerModal(
                                `user-role-${role.id}-delete`,
                                <ModalConfirm
                                    onConfirm={() => {
                                        setIsLoading(true)
                                        deleteRole(role.id).then(() => {
                                            fetch().then(() => {
                                                addToastNotification({
                                                    title: 'Delete success.',
                                                    text: 'Role has been deleted.',
                                                    type: 'success',
                                                })
                                                closeModal(`user-role-${role.id}-delete`)
                                                setIsLoading(false)
                                            })
                                        })
                                    }}
                                    onCancel={() => closeModal(`user-role-${role.id}-delete`)}
                                >
                                    <p>
                                        Are you sure to delete Role: <b>{role.name}</b>?
                                    </p>
                                </ModalConfirm>,
                            )
                        }

                        return (
                            <Table.ExpandManager key={role.id}>
                                {({ addExpand, expand }) => {
                                    addExpand(
                                        'permissions',
                                        <RowExpandPermissions
                                            role={role}
                                            navigate={navigate}
                                            setIsLoading={setIsLoading}
                                            addToastNotification={addToastNotification}
                                            fetch={fetch}
                                            registerModal={registerModal}
                                            openModal={openModal}
                                            closeModal={closeModal}
                                            deleteRolePermission={deleteRolePermission}
                                        />,
                                    )

                                    addExpand(
                                        'users',
                                        <RowExpandUsers
                                            role={role}
                                            navigate={navigate}
                                            setIsLoading={setIsLoading}
                                            addToastNotification={addToastNotification}
                                            fetch={fetch}
                                            registerModal={registerModal}
                                            openModal={openModal}
                                            closeModal={closeModal}
                                            deleteUserRole={deleteUserRole}
                                        />,
                                    )

                                    return (
                                        <Table.Tr key={role.id}>
                                            <Table.Td xs={1}>{role.id}</Table.Td>
                                            <Table.Td xs={3}>{role.name}</Table.Td>
                                            <Table.Td xs={4}>
                                                <div>
                                                    {role?.permissions?.length > 0 && (
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

                                                    {role.users_count > 0 && (
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
        )
    }
}

export default RolesTable
