import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { AddUserFormContainer } from './AddUsers/AddUserFormContainer'

interface HeaderProps {
    role: Object
}

export class AddUsers extends React.Component<HeaderProps, null> {
    render() {
        const { role, users, setIsLoading, fetch, isLoading, addToastNotification, addUserRole } = this.props
        return (
            <Card header={<h1>Add Users</h1>}>
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
        )
    }
}

export default AddUsers
