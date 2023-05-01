import * as React from 'react'
import { LoadingOverlay } from '../../../../components'
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
        const {
            addUser,
            fetchOne,
            isLoading,
            navigate,
            roles,
            addRoleToNewUser,
            removeRoleFromNewUser,
            permissions,
            addPermissionToNewUser,
            removePermissionFromNewUser,
        } = this.props
        return (
            <div>
                <AddFormContainer
                    navigate={navigate}
                    addUser={addUser}
                    fetchOne={fetchOne}
                    roles={roles}
                    addRoleToNewUser={addRoleToNewUser}
                    removeRoleFromNewUser={removeRoleFromNewUser}
                    permissions={permissions}
                    addPermissionToNewUser={addPermissionToNewUser}
                    removePermissionFromNewUser={removePermissionFromNewUser}
                />
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default Add
