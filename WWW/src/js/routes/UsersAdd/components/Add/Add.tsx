import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddFormContainer } from './AddFormContainer'
import Roles from '../Roles/Roles'
interface EditProps {
    addUser: Function
    user: Object
    fetchOne: Function
    isLoading: boolean
}

interface EditState {}

export class Add extends React.Component<EditProps, EditState> {
    render() {
        const { addUser, fetchOne, isLoading, navigate, roles, addRoleToNewUser, removeRoleFromNewUser } = this.props
        return (
            <div>
                <AddFormContainer
                    navigate={navigate}
                    addUser={addUser}
                    fetchOne={fetchOne}
                    roles={roles}
                    addRoleToNewUser={addRoleToNewUser}
                    removeRoleFromNewUser={removeRoleFromNewUser}
                />
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export default Add
