import * as React from 'react'
import { LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'
interface EditProps {
    addUser: Function
    fetchOne: Function
    isLoading: boolean
}

interface EditState {}

export class Add extends React.Component<EditProps, EditState> {
    render() {
        const {
            addUser,
            fetchOne,
            isLoading,
            navigate,
            roles,
            addRoleToNewUser,
            removeRoleFromNewUser,
            permissions,
            addPermissionToNewUser,
            removePermissionFromNewUser,
            addToastNotification,
            newUserRoles,
            newUserPermissions,
            setIsLoading,
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
            canByPermission,
        } = this.props
        return (
            <div>
                <AddFormContainer
                    navigate={navigate}
                    addUser={addUser}
                    fetchOne={fetchOne}
                    roles={roles}
                    addRoleToNewUser={addRoleToNewUser}
                    removeRoleFromNewUser={removeRoleFromNewUser}
                    permissions={permissions}
                    addPermissionToNewUser={addPermissionToNewUser}
                    removePermissionFromNewUser={removePermissionFromNewUser}
                    addToastNotification={addToastNotification}
                    newUserRoles={newUserRoles}
                    newUserPermissions={newUserPermissions}
                    setIsLoading={setIsLoading}
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
                    clearPermissionsFromNewRole={clearPermissionsFromNewRole}
                    canByPermission={canByPermission}
                />
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default Add
