import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
interface EditProps {
    fetch: Function
    isLoading: boolean
}

interface EditState {}

export class Edit extends React.Component<EditProps, EditState> {
    render() {
        const { editRole, role, fetch, isLoading, addToastNotification } = this.props
        return (
            <Card header={<h1>Edit</h1>}>
                <EditFormContainer
                    initialValues={role}
                    save={editRole}
                    role={role}
                    fetch={fetch}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Edit
