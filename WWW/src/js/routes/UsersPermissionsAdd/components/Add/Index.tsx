import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'

interface HeaderProps {}

export class AddPermission extends React.Component<HeaderProps, null> {
    render() {
        const { roles, setIsLoading, addPermission, isLoading, addToastNotification } = this.props
        return (
            <Card header={<h1>Add Permission</h1>}>
                <AddFormContainer
                    roles={roles}
                    setIsLoading={setIsLoading}
                    addPermission={addPermission}
                    addToastNotification={addToastNotification}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default { AddPermission }
