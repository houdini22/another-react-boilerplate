import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
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
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UsersManager getRoles permissionId={query['id']} getUsers>
                                    {({
                                        roles,
                                        isLoading,
                                        setIsLoading,
                                        addPermission,
                                        permission,
                                        newPermissionUsers,
                                        addNewPermissionToUser,
                                        removeNewPermissionFromUser,
                                        users,
                                    }) => {
                                        return (
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
                                                            removeNewPermissionFromUser={removeNewPermissionFromUser}
                                                            navigate={navigate}
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

export default UserPermissionsAdd
