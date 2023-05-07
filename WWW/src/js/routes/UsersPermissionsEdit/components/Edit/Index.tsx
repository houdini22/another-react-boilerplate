import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { NotificationsManager } from '../../../../containers/NotificationsManager'
import { Permission, SetIsLoading } from '../../../../../types.d'
interface EditProps {
    editPermission: EditPermission
    permission: Permission
    fetchPermission: () => Promise<void>
    isLoading: boolean
    setIsLoading: SetIsLoading
}

interface EditState {}

export class EditPermission extends React.Component<EditProps, EditState> {
    render() {
        const { editPermission, permission, fetchPermission, isLoading, setIsLoading } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <Card header={<h1>Permission</h1>} color={'primary'}>
                        <EditFormContainer
                            initialValues={permission}
                            save={editPermission}
                            role={permission}
                            fetchPermission={fetchPermission}
                            addToastNotification={addToastNotification}
                            setIsLoading={setIsLoading}
                            permission={permission}
                        />
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </NotificationsManager>
        )
    }
}

export default { EditPermission }
