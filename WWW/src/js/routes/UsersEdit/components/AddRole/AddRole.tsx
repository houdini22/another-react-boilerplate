import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddRoleFormContainer } from './AddRoleFormContainer'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    addUserRole: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class AddRole extends React.Component<AddRoleProps, null> {
    render() {
        const { roles, setIsLoading, addUserRole, fetchOne, user, isLoading } = this.props
        return (
            <Card header={<h1>Add Role</h1>}>
                <AddRoleFormContainer
                    user={user}
                    roles={roles}
                    onSubmit={({ role }) => {
                        if (role) {
                            setIsLoading(true)

                            addUserRole(user, { id: role }).then(() => {
                                fetchOne(user['id']).then(() => {
                                    setIsLoading(false)
                                })
                            })
                        }
                    }}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddRole
