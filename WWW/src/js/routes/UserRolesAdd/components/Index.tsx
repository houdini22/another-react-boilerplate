import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import { AddRole } from './Add/Index'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { UsersManager } from '../../../containers/UsersManager'

interface UsersViewState {}

export class UserRolesEdit extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UsersManager roleId={query['id']} getPermissions getUsers>
                                    {({
                                        role,
                                        isLoading,
                                        addRole,
                                        setIsLoading,
                                        permissions,
                                        newRolePermissions,
                                        addPermissionToNewRole,
                                        removePermissionFromNewRole,
                                        newRoleUsers,
                                        addNewRoleToUser,
                                        removeNewRoleFromUser,
                                        users,
                                    }) => (
                                        <PageContent>
                                            <Header navigate={navigate} role={role} />
                                            <Row>
                                                <Col xs={12}>
                                                    <AddRole
                                                        addRole={addRole}
                                                        isLoading={isLoading}
                                                        addToastNotification={addToastNotification}
                                                        setIsLoading={setIsLoading}
                                                        permissions={permissions}
                                                        newRolePermissions={newRolePermissions}
                                                        addPermissionToNewRole={addPermissionToNewRole}
                                                        removePermissionFromNewRole={removePermissionFromNewRole}
                                                        users={users}
                                                        newRoleUsers={newRoleUsers}
                                                        addNewRoleToUser={addNewRoleToUser}
                                                        removeNewRoleFromUser={removeNewRoleFromUser}
                                                        navigate={navigate}
                                                    />
                                                </Col>
                                            </Row>
                                        </PageContent>
                                    )}
                                </UsersManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UserRolesEdit
