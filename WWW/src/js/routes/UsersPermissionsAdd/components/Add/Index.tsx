import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'

interface HeaderProps {}

export class AddPermission extends React.Component<HeaderProps, null> {
    render() {
        const {
            roles,
            setIsLoading,
            addPermission,
            isLoading,
            addToastNotification,
            users,
            newPermissionUsers,
            removeNewPermissionFromUser,
            addNewPermissionToUser,
            navigate,
            noAddToUsers,
            noRoleId,
        } = this.props
        return (
            <Card header={<h1>Add Permission</h1>} color="primary">
                <AddFormContainer
                    roles={roles}
                    setIsLoading={setIsLoading}
                    addPermission={addPermission}
                    addToastNotification={addToastNotification}
                    users={users}
                    newPermissionUsers={newPermissionUsers}
                    removeNewPermissionFromUser={removeNewPermissionFromUser}
                    addNewPermissionToUser={addNewPermissionToUser}
                    navigate={navigate}
                    noAddToUsers={noAddToUsers}
                    noRoleId={noRoleId}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default { AddPermission }
