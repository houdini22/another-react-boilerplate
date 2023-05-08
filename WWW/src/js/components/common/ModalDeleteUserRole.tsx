import * as React from 'react'
import { DeleteUserRole, Role, SetIsLoading, User } from '../../../types.d'
import { ModalConfirm } from './ModalConfirm/ModalConfirm'
import { NotificationsManager } from '../../containers'

interface ModalDeleteUserRoleProps {
    role: Role
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    user: User
    fetch: () => Promise<void>
    closeModal: () => any
}

export class ModalDeleteUserRole extends React.Component<ModalDeleteUserRoleProps, null> {
    render() {
        const { setIsLoading, deleteUserRole, fetch, closeModal, role, user } = this.props

        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <ModalConfirm
                        onConfirm={() => {
                            setIsLoading(true).then(() => {
                                deleteUserRole(user, role).then(() => {
                                    fetch().then(() => {
                                        setIsLoading(false).then(() => {
                                            addToastNotification({
                                                title: 'Remove success.',
                                                text: `Role ID: ${role.id} has been removed from User ID: ${user.id}.`,
                                                type: 'success',
                                                href: '/users',
                                            })
                                            closeModal()
                                        })
                                    })
                                })
                            })
                        }}
                        onCancel={() => closeModal()}
                    >
                        <p>
                            Are you sure to delete Role: <b>{role.name}</b> from User <b>{user.name}</b>?
                        </p>
                    </ModalConfirm>
                )}
            </NotificationsManager>
        )
    }
}

export default ModalDeleteUserRole
