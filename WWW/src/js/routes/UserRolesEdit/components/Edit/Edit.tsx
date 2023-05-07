import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { NotificationsManager } from '../../../../containers/NotificationsManager'
interface EditProps {}

export class Edit extends React.Component<EditProps, null> {
    render() {
        const { editRole, role, fetch, isLoading, setIsLoading } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <Card header={<h1>Role</h1>} color={'primary'}>
                        <EditFormContainer
                            initialValues={role}
                            save={editRole}
                            role={role}
                            fetch={fetch}
                            addToastNotification={addToastNotification}
                            setIsLoading={setIsLoading}
                        />
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </NotificationsManager>
        )
    }
}

export default Edit
