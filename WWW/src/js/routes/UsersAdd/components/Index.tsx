import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
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
                                <UserRolesManager>
                                    {({ roles, permissions }) => (
                                        <UsersManager>
                                            {({
                                                user,
                                                isLoading,
                                                setIsLoading,
                                                addUser,
                                                fetchOne,
                                                addUserRole,
                                                addRoleToNewUser,
                                                removeRoleFromNewUser,
                                                addPermissionToNewUser,
                                                removePermissionFromNewUser,
                                            }) => {
                                                return (
                                                    <PageContent>
                                                        <Header />
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Add
                                                                    addUser={addUser}
                                                                    user={user}
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
                                                                    removePermissionFromNewUser={
                                                                        removePermissionFromNewUser
                                                                    }
                                                                    addToastNotification={addToastNotification}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </PageContent>
                                                )
                                            }}
                                        </UsersManager>
                                    )}
                                </UserRolesManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersAddView
