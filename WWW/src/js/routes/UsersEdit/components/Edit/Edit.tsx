import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
interface EditProps {
    editUser: Function
    user: Object
    fetchOne: Function
    isLoading: boolean
}

interface EditState {}

export class Edit extends React.Component<EditProps, EditState> {
    render() {
        const { editUser, user, fetchOne, isLoading, addToastNotification, setIsLoading, canByPermission } = this.props
        return (
            <Card header={<h1>User</h1>} color={'primary'}>
                <EditFormContainer
                    initialValues={user}
                    editUser={editUser}
                    user={user}
                    fetchOne={fetchOne}
                    addToastNotification={addToastNotification}
                    setIsLoading={setIsLoading}
                    canByPermission={canByPermission}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Edit
