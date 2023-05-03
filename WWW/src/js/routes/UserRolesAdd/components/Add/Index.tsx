import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'
interface EditProps {}

interface EditState {}

export class AddRole extends React.Component<EditProps, EditState> {
    render() {
        const { addRole, isLoading, addToastNotification, setIsLoading } = this.props
        return (
            <Card header={<h1>Add Role</h1>}>
                <AddFormContainer
                    setIsLoading={setIsLoading}
                    save={addRole}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default { AddRole }
