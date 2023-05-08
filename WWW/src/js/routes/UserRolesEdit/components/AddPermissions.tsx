import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { AddPermissionFormContainer } from './AddPermissions/AddPermissionFormContainer'
import { NotificationsManager } from '../../../containers'

interface AddPermissionsProps {}

export class AddPermissions extends React.Component<AddPermissionsProps, null> {
    render() {
        const { role, permissions, setIsLoading, addPermission, fetchPermissions, fetchOne, isLoading } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <Card header={<h1>Add Permissions</h1>} color={'primary'}>
                        <AddPermissionFormContainer
                            role={role}
                            permissions={permissions}
                            setIsLoading={setIsLoading}
                            addPermission={addPermission}
                            fetchPermissions={fetchPermissions}
                            fetchOne={fetchOne}
                            addToastNotification={addToastNotification}
                        />
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </NotificationsManager>
        )
    }
}

export default AddPermissions
