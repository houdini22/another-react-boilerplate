import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
interface EditProps {
    editPermission: Function
    permission: Object
    fetch: Function
    isLoading: boolean
    addToastNotification: Function
    setIsLoading: Function
}

interface EditState {}

export class EditPermission extends React.Component<EditProps, EditState> {
    render() {
        const { editPermission, permission, fetchOnePermission, isLoading, addToastNotification, setIsLoading } =
            this.props
        return (
            <Card header={<h1>Edit</h1>}>
                <EditFormContainer
                    initialValues={permission}
                    save={editPermission}
                    role={permission}
                    fetchOnePermission={fetchOnePermission}
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
