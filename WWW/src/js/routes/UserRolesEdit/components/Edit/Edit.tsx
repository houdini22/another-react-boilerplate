import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { formatDateTime } from '../../../../helpers/date-time'
interface EditProps {
    editUser: Function
    user: Object
    fetchOne: Function
    isLoading: boolean
}

interface EditState {}

export class Edit extends React.Component<EditProps, EditState> {
    render() {
        const { editRole, role, fetchOne, isLoading } = this.props
        return (
            <Card header={<h1>Edit</h1>}>
                <EditFormContainer initialValues={role} editRole={editRole} role={role} fetchOne={fetchOne} />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Edit
