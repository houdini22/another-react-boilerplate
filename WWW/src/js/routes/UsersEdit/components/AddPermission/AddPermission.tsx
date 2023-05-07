import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddPermissionFormContainer } from './AddPermissionFormContainer'

interface AddRoleProps {
    permissions: any
    setIsLoading: Function
    addUserPermission: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class AddPermission extends React.Component<AddRoleProps, null> {
    render() {
        const { permissions, setIsLoading, addUserPermission, fetchOne, user, isLoading, addToastNotification } = this.props
        return (
            <Card header={<h1>Add Permission</h1>}>
                <AddPermissionFormContainer
                    user={user}
                    permissions={permissions}
                    setIsLoading={setIsLoading}
                    addUserPermission={addUserPermission}
                    fetchOne={fetchOne}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddPermission
