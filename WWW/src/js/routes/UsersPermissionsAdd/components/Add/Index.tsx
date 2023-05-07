import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'
import { AuthorizationManager, NotificationsManager, RouteManager } from '../../../../containers'

interface AddPermissionProps {}

export class AddPermission extends React.Component<AddPermissionProps, null> {
    render() {
        const {
            roles,
            setIsLoading,
            addPermission,
            isLoading,
            users,
            removeUserFromNewPermission,
            addUserToNewPermission,
            noAddToUsers,
            noRoleId,
            newUsers,
        } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <AuthorizationManager>
                                {({ canByPermission }) => (
                                    <Card header={<h1>Add Permission</h1>} color="primary">
                                        <AddFormContainer
                                            roles={roles}
                                            setIsLoading={setIsLoading}
                                            addPermission={addPermission}
                                            addToastNotification={addToastNotification}
                                            users={users}
                                            newUsers={newUsers}
                                            removeUserFromNewPermission={removeUserFromNewPermission}
                                            addUserToNewPermission={addUserToNewPermission}
                                            navigate={navigate}
                                            noAddToUsers={noAddToUsers}
                                            noRoleId={noRoleId}
                                            canByPermission={canByPermission}
                                        />
                                        {isLoading && <LoadingOverlay />}
                                    </Card>
                                )}
                            </AuthorizationManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default { AddPermission }
