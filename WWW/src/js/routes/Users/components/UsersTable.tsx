import * as React from 'react'
import { Table } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'
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
import { User } from '../../../../types.d'

interface UsersTableProps {
    users: Array<User>
    setIsLoading: Function
    deleteUserRole: Function
    fetch: Function
    activateUser: Function
    deactivateUser: Function
    page: number
    perPage: number
    total: number
    totalPages: number
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
            addToastNotification,
            registerModal,
            openModal,
            closeModal,
            deleteUser,
            canByPermissions,
            deleteAvatar,
        } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
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
                            {users.map((user) => {
                                const permissionsFromRoles = userPermissionFromRoles(user)

                                return (
                                    <Table.ExpandManager key={user.id}>
                                        {({ addExpand, expand }) => {
                                            addExpand(
                                                'roles',
                                                <RowExpandRoles
                                                    user={user}
                                                    fetch={fetch}
                                                    addToastNotification={addToastNotification}
                                                    deleteUserRole={deleteUserRole}
                                                    navigate={navigate}
                                                    setIsLoading={setIsLoading}
                                                    registerModal={registerModal}
                                                    openModal={openModal}
                                                    closeModal={closeModal}
                                                />,
                                            )

                                            addExpand(
                                                'permissions',
                                                <RowExpandPermissions
                                                    user={user}
                                                    navigate={navigate}
                                                    setIsLoading={setIsLoading}
                                                    addToastNotification={addToastNotification}
                                                    permissionsFromRoles={permissionsFromRoles}
                                                    deleteUserPermission={deleteUserPermission}
                                                    fetch={fetch}
                                                    registerModal={registerModal}
                                                    openModal={openModal}
                                                    closeModal={closeModal}
                                                />,
                                            )

                                            if (user.is_deletable) {
                                                registerModal(
                                                    `user-${user.id}-delete`,
                                                    <ModalConfirm
                                                        onConfirm={() => {
                                                            setIsLoading(true)

                                                            deleteUser(user.id).then(() => {
                                                                fetch().then(() => {
                                                                    closeModal(`user-${user.id}-delete`)
                                                                    addToastNotification({
                                                                        title: 'Remove success.',
                                                                        text: `User ID: ${user.id} has been removed.`,
                                                                        type: 'success',
                                                                        href: '/users',
                                                                    })
                                                                    setIsLoading(false)
                                                                })
                                                            })
                                                        }}
                                                        onCancel={() => closeModal(`user-${user.id}-delete`)}
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
                                                    <Table.Td xs={10} md={3}>
                                                        <RowUsername user={user} />
                                                    </Table.Td>
                                                    <Table.Td xs={12} md={4} alignRight>
                                                        <RowResources
                                                            user={user}
                                                            navigate={navigate}
                                                            permissionsFromRoles={permissionsFromRoles}
                                                            expand={expand}
                                                            canByPermissions={canByPermissions}
                                                            deleteAvatar={deleteAvatar}
                                                            setIsLoading={setIsLoading}
                                                            fetch={fetch}
                                                        />
                                                    </Table.Td>
                                                    <Table.Td xs={6} md={2}>
                                                        <RowStatus
                                                            user={user}
                                                            activateUser={activateUser}
                                                            deactivateUser={deactivateUser}
                                                            addToastNotification={addToastNotification}
                                                            fetch={fetch}
                                                            registerModal={registerModal}
                                                            openModal={openModal}
                                                            closeModal={closeModal}
                                                            setIsLoading={setIsLoading}
                                                            canByPermission={canByPermissions}
                                                        />
                                                    </Table.Td>
                                                    <Table.Td xs={6} md={2}>
                                                        <RowActions
                                                            user={user}
                                                            navigate={navigate}
                                                            openModal={openModal}
                                                            canByPermissions={canByPermissions}
                                                        />
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
            </RouteManager>
        )
    }
}

export default UsersTable
