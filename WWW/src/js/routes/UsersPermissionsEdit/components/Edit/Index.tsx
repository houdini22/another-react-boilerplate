import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
interface EditProps {
    editPermission: Function
    permission: Object
    fetchPermission: Function
    isLoading: boolean
    addToastNotification: Function
    setIsLoading: Function
}

interface EditState {}

export class EditPermission extends React.Component<EditProps, EditState> {
    render() {
        const { editPermission, permission, fetchPermission, isLoading, addToastNotification, setIsLoading } =
            this.props
        return (
            <Card header={<h1>Edit</h1>}>
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
        )
    }
}

export default { EditPermission }
