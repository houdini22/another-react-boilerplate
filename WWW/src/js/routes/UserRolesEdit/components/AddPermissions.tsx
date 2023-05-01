import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { AddPermissionFormContainer } from '../../UserRoles/components/AddPermission/AddPermissionFormContainer'

interface HeaderProps {
    role: Object
}

export class AddPermissions extends React.Component<HeaderProps, null> {
    render() {
        const {
            role,
            roles,
            permissions,
            setIsLoading,
            addPermission,
            fetchPermissions,
            fetchOne,
            isLoading,
            addToastNotification,
        } = this.props
        return (
            <Card header={<h1>Add Permissions</h1>}>
                <AddPermissionFormContainer
                    role={role}
                    roles={roles}
                    permissions={permissions}
                    setIsLoading={setIsLoading}
                    addPermission={addPermission}
                    fetchPermissions={fetchPermissions}
                    fetchOne={fetchOne}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddPermissions
