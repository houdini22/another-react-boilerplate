import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'

interface AddRoleProps {}

export class AddRole extends React.Component<AddRoleProps, null> {
    render() {
        const {
            addRole,
            isLoading,
            addToastNotification,
            setIsLoading,
            permissions,
            newRolePermissions,
            addPermissionToNewRole,
            removePermissionFromNewRole,
            users,
            newRoleUsers,
            addNewRoleToUser,
            removeNewRoleFromUser,
            navigate,
            addPermission,
            fetchPermissions,
            canByPermission,
        } = this.props
        return (
            <div>
                <AddFormContainer
                    setIsLoading={setIsLoading}
                    save={addRole}
                    addToastNotification={addToastNotification}
                    permissions={permissions}
                    newRolePermissions={newRolePermissions}
                    addPermissionToNewRole={addPermissionToNewRole}
                    removePermissionFromNewRole={removePermissionFromNewRole}
                    users={users}
                    newRoleUsers={newRoleUsers}
                    addNewRoleToUser={addNewRoleToUser}
                    removeNewRoleFromUser={removeNewRoleFromUser}
                    navigate={navigate}
                    addPermission={addPermission}
                    isLoading={isLoading}
                    fetchPermissions={fetchPermissions}
                    canByPermission={canByPermission}
                />
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default { AddRole }
