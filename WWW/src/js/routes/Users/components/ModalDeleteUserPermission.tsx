import * as React from 'react'
import { DeleteUserPermission, Permission, SetIsLoading, User } from '../../../../types.d'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import { NotificationsManager } from '../../../containers/NotificationsManager'

interface ModalDeleteUserPermissionProps {
    permission: Permission
    setIsLoading: SetIsLoading
    deleteUserPermission: DeleteUserPermission
    user: User
    fetch: () => Promise<void>
    closeModal: () => any
}

export class ModalDeleteUserPermission extends React.Component<ModalDeleteUserPermissionProps, null> {
    render() {
        const { setIsLoading, deleteUserPermission, fetch, closeModal, permission, user } = this.props

        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <ModalConfirm
                        onConfirm={() => {
                            setIsLoading(true).then(() => {
                                deleteUserPermission(permission, user).then(() => {
                                    fetch().then(() => {
                                        setIsLoading(false).then(() => {
                                            addToastNotification({
                                                title: 'Remove success.',
                                                text: `Permission ID: ${permission.id} has been removed from User ID: ${user.id}.`,
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
                            Are you sure to delete Permission: <b>{permission.name}</b> from User <b>{user.name}</b>?
                        </p>
                    </ModalConfirm>
                )}
            </NotificationsManager>
        )
    }
}

export default ModalDeleteUserPermission
