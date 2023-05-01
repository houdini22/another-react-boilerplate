import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'
interface EditProps {
    addUser: Function
    user: Object
    fetchOne: Function
    isLoading: boolean
}

interface EditState {}

export class Add extends React.Component<EditProps, EditState> {
    render() {
        const { addUser, user, fetchOne, isLoading, navigate } = this.props
        return (
            <Card header={<h1>Add User</h1>}>
                <AddFormContainer
                    navigate={navigate}
                    initialValues={user}
                    addUser={addUser}
                    user={user}
                    fetchOne={fetchOne}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Add
