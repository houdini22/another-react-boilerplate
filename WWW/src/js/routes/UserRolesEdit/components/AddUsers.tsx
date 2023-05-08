import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { AddUserFormContainer } from './AddUsers/AddUserFormContainer'
import { NotificationsManager } from '../../../containers'
import { Role } from '../../../../types.d'

interface AddUsersProps {
    role: Role
}

export class AddUsers extends React.Component<AddUsersProps, null> {
    render() {
        const { role, users, setIsLoading, fetch, isLoading, addUserRole } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <Card header={<h1>Add Users</h1>} color={'primary'}>
                        <AddUserFormContainer
                            role={role}
                            users={users}
                            setIsLoading={setIsLoading}
                            fetch={fetch}
                            addToastNotification={addToastNotification}
                            addUserRole={addUserRole}
                        />
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </NotificationsManager>
        )
    }
}

export default AddUsers
