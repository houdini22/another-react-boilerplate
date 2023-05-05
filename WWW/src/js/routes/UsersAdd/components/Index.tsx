import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Row } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Add from './Add/Add'
import { NotificationsManager } from '../../../containers/NotificationsManager'

interface UsersViewState {}

export class UsersAddView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UsersManager getRoles getPermissions getUsers>
                                    {({
                                        isLoading,
                                        setIsLoading,
                                        addUser,
                                        fetchOne,
                                        addUserRole,
                                        addRoleToNewUser,
                                        removeRoleFromNewUser,
                                        addPermissionToNewUser,
                                        removePermissionFromNewUser,
                                        newUserRoles,
                                        newUserPermissions,
                                        roles,
                                        permissions,
                                        addRole,
                                        newRolePermissions,
                                        addPermissionToNewRole,
                                        removePermissionFromNewRole,
                                        users,
                                        newRoleUsers,
                                        addNewRoleToUser,
                                        removeNewRoleFromUser,
                                        addPermission,
                                        fetchPermissions,
                                        fetchRoles,
                                    }) => {
                                        return (
                                            <PageContent>
                                                <Header />
                                                <Row>
                                                    <Col xs={12}>
                                                        <Add
                                                            addUser={addUser}
                                                            fetchOne={fetchOne}
                                                            isLoading={isLoading}
                                                            setIsLoading={setIsLoading}
                                                            navigate={navigate}
                                                            addUserRole={addUserRole}
                                                            addRoleToNewUser={addRoleToNewUser}
                                                            removeRoleFromNewUser={removeRoleFromNewUser}
                                                            roles={roles}
                                                            permissions={permissions}
                                                            addPermissionToNewUser={addPermissionToNewUser}
                                                            removePermissionFromNewUser={removePermissionFromNewUser}
                                                            addToastNotification={addToastNotification}
                                                            newUserRoles={newUserRoles}
                                                            newUserPermissions={newUserPermissions}
                                                            addRole={addRole}
                                                            newRolePermissions={newRolePermissions}
                                                            addPermissionToNewRole={addPermissionToNewRole}
                                                            removePermissionFromNewRole={removePermissionFromNewRole}
                                                            users={users}
                                                            newRoleUsers={newRoleUsers}
                                                            addNewRoleToUser={addNewRoleToUser}
                                                            removeNewRoleFromUser={removeNewRoleFromUser}
                                                            addPermission={addPermission}
                                                            fetchPermissions={fetchPermissions}
                                                            fetchRoles={fetchRoles}
                                                        />
                                                    </Col>
                                                </Row>
                                            </PageContent>
                                        )
                                    }}
                                </UsersManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersAddView
