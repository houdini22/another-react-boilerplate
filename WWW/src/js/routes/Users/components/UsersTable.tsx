import * as React from 'react'
import { Table } from '../../../components'
import { TableSummary } from '../../../components/common/List/TableSummary'
import RowId from './UsersTable/RowId'
import RowUsername from './UsersTable/RowUsername'
import RowResources from './UsersTable/RowResources'
import RowStatus from './UsersTable/RowStatus'
import RowActions from './UsersTable/RowActions'
import { userPermissionFromRoles } from '../../../helpers/permissions'
import RowExpandRoles from './UsersTable/RowExpandRoles'
import RowExpandPermissions from './UsersTable/RowExpandPermissions'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import {
    ActivateUser,
    DeactivateUser,
    DeleteUser,
    DeleteUserAvatar,
    DeleteUserPermission,
    DeleteUserRole,
    SetIsLoading,
    User,
} from '../../../../types.d'
import { NotificationsManager, RouteManager } from '../../../containers'
import { ModalManager } from '../../../components/ui/Modal'

interface UsersTableProps {
    users: Array<User>
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    fetch: () => Promise<void>
    activateUser: ActivateUser
    deactivateUser: DeactivateUser
    page: number
    perPage: number
    total: number
    totalPages: number
    deleteUserPermission: DeleteUserPermission
    deleteUser: DeleteUser
    deleteAvatar: DeleteUserAvatar
}

export class UsersTable extends React.Component<UsersTableProps, null> {
    render() {
        const {
            users,
            setIsLoading,
            deleteUserRole,
            fetch,
            activateUser,
            deactivateUser,
            page,
            perPage,
            total,
            totalPages,
            deleteUserPermission,
            deleteUser,
            deleteAvatar,
        } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <ModalManager>
                                {({ registerModal, openModal, closeModal }) => (
                                    <Table.Container bordered striped>
                                        <Table.THead>
                                            <Table.Tr>
                                                <Table.Th xs={1} md={1}>
                                                    ID
                                                </Table.Th>
                                                <Table.Th xs={11} md={3}>
                                                    Name & Email
                                                </Table.Th>
                                                <Table.Th xs={12} md={4}>
                                                    Resources
                                                </Table.Th>
                                                <Table.Th xs={6} md={2}>
                                                    Status
                                                </Table.Th>
                                                <Table.Th xs={6} md={2}>
                                                    Actions
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.THead>
                                        <Table.TBody>
                                            {users?.map((user) => {
                                                const permissionsFromRoles = userPermissionFromRoles(user)

                                                return (
                                                    <Table.ExpandManager key={user.id}>
                                                        {({ addExpand, expand, collapse }) => {
                                                            addExpand(
                                                                'roles',
                                                                <RowExpandRoles
                                                                    user={user}
                                                                    fetch={fetch}
                                                                    deleteUserRole={deleteUserRole}
                                                                    setIsLoading={setIsLoading}
                                                                />,
                                                            )

                                                            addExpand(
                                                                'permissions',
                                                                <RowExpandPermissions
                                                                    user={user}
                                                                    setIsLoading={setIsLoading}
                                                                    permissionsFromRoles={permissionsFromRoles}
                                                                    deleteUserPermission={deleteUserPermission}
                                                                    fetch={fetch}
                                                                />,
                                                            )

                                                            if (user.is_deletable) {
                                                                const modalName = `user-${user.id}-delete`
                                                                registerModal(
                                                                    modalName,
                                                                    <ModalConfirm
                                                                        onConfirm={() => {
                                                                            setIsLoading(true).then(() => {
                                                                                deleteUser(user).then(
                                                                                    () => {
                                                                                        fetch().then(
                                                                                            () => {
                                                                                                closeModal(modalName)
                                                                                                addToastNotification({
                                                                                                    title: 'Remove success.',
                                                                                                    text: `User ID: ${user.id} has been removed.`,
                                                                                                    type: 'success',
                                                                                                    href: '/users',
                                                                                                })
                                                                                                setIsLoading(false)
                                                                                            },
                                                                                            () => {
                                                                                                closeModal(modalName)
                                                                                                setIsLoading(false)
                                                                                            },
                                                                                        )
                                                                                    },
                                                                                    () => {
                                                                                        closeModal(modalName)
                                                                                        setIsLoading(false)
                                                                                    },
                                                                                )
                                                                            })
                                                                        }}
                                                                        onCancel={() => closeModal(modalName)}
                                                                    >
                                                                        <p>
                                                                            Are you sure to delete user: <b>{user.name}</b>?
                                                                        </p>
                                                                    </ModalConfirm>,
                                                                )
                                                            }

                                                            return (
                                                                <Table.Tr key={user.id}>
                                                                    <Table.Td xs={1} md={1}>
                                                                        <RowId user={user} />
                                                                    </Table.Td>
                                                                    <Table.Td xs={11} md={3}>
                                                                        <RowUsername user={user} />
                                                                    </Table.Td>
                                                                    <Table.Td xs={12} md={4} alignRight>
                                                                        <RowResources
                                                                            user={user}
                                                                            navigate={navigate}
                                                                            permissionsFromRoles={permissionsFromRoles}
                                                                            expand={expand}
                                                                            deleteAvatar={deleteAvatar}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={fetch}
                                                                            collapse={collapse}
                                                                        />
                                                                    </Table.Td>
                                                                    <Table.Td xs={6} md={2}>
                                                                        <RowStatus
                                                                            user={user}
                                                                            activateUser={activateUser}
                                                                            deactivateUser={deactivateUser}
                                                                            fetch={fetch}
                                                                            setIsLoading={setIsLoading}
                                                                        />
                                                                    </Table.Td>
                                                                    <Table.Td xs={6} md={2}>
                                                                        <RowActions user={user} openModal={openModal} />
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
                            </ModalManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersTable
