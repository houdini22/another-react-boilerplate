import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import { AddPermission } from './Add/Index'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { UsersManager } from '../../../containers/UsersManager'

export class UserPermissionsAdd extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UserRolesManager>
                                    {({
                                        roles,
                                        isLoading,
                                        setIsLoading,
                                        addPermission,
                                        permission,
                                        newPermissionUsers,
                                        addNewPermissionToUser,
                                        removeNewPermissionFromUser,
                                    }) => {
                                        return (
                                            <UsersManager>
                                                {({ users }) => (
                                                    <PageContent>
                                                        <Header navigate={navigate} permission={permission} />
                                                        <Row>
                                                            <Col xs={12}>
                                                                <AddPermission
                                                                    addPermission={addPermission}
                                                                    isLoading={isLoading}
                                                                    addToastNotification={addToastNotification}
                                                                    setIsLoading={setIsLoading}
                                                                    roles={roles}
                                                                    users={users}
                                                                    newPermissionUsers={newPermissionUsers}
                                                                    addNewPermissionToUser={addNewPermissionToUser}
                                                                    removeNewPermissionFromUser={
                                                                        removeNewPermissionFromUser
                                                                    }
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </PageContent>
                                                )}
                                            </UsersManager>
                                        )
                                    }}
                                </UserRolesManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UserPermissionsAdd
