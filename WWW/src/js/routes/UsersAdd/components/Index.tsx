import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Row } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Add from './Add/Add'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

interface UsersViewState {}

export class UsersAddView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => (
                            <AuthorizationManager>
                                {({ canByPermission }) => (
                                    <NotificationsManager>
                                        {({ addToastNotification }) => {
                                            setTitleSegments(['Users', 'Add User'])
                                            return (
                                                <UsersManager getRoles getPermissions>
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
                                                        clearPermissionsFromNewRole,
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
                                                                            removeRoleFromNewUser={
                                                                                removeRoleFromNewUser
                                                                            }
                                                                            roles={roles}
                                                                            permissions={permissions}
                                                                            addPermissionToNewUser={
                                                                                addPermissionToNewUser
                                                                            }
                                                                            removePermissionFromNewUser={
                                                                                removePermissionFromNewUser
                                                                            }
                                                                            addToastNotification={addToastNotification}
                                                                            newUserRoles={newUserRoles}
                                                                            newUserPermissions={newUserPermissions}
                                                                            addRole={addRole}
                                                                            newRolePermissions={newRolePermissions}
                                                                            addPermissionToNewRole={
                                                                                addPermissionToNewRole
                                                                            }
                                                                            removePermissionFromNewRole={
                                                                                removePermissionFromNewRole
                                                                            }
                                                                            users={users}
                                                                            newRoleUsers={newRoleUsers}
                                                                            addNewRoleToUser={addNewRoleToUser}
                                                                            removeNewRoleFromUser={
                                                                                removeNewRoleFromUser
                                                                            }
                                                                            addPermission={addPermission}
                                                                            fetchPermissions={fetchPermissions}
                                                                            fetchRoles={fetchRoles}
                                                                            clearPermissionsFromNewRole={
                                                                                clearPermissionsFromNewRole
                                                                            }
                                                                            canByPermission={canByPermission}
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
                            </AuthorizationManager>
                        )}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersAddView
