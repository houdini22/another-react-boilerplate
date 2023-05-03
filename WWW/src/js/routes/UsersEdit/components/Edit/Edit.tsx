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
        const { editUser, user, fetchOne, isLoading, addToastNotification } = this.props
        return (
            <Card header={<h1>Edit</h1>}>
                <EditFormContainer
                    initialValues={user}
                    editUser={editUser}
                    user={user}
                    fetchOne={fetchOne}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Edit
