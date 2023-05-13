import * as React from 'react'
import { DeleteUserRole, Role, SetIsLoading, User } from '../../../types.d'
import { ModalConfirm } from './ModalConfirm/ModalConfirm'
import { NotificationsManager } from '../../containers'

interface ModalDeleteUserRoleProps {}

export class ModalDeleteMenuLink extends React.Component<ModalDeleteUserRoleProps, null> {
    render() {
        const { setIsLoading, deleteNode, fetchMenus, closeModal, menu, link } = this.props

        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <ModalConfirm
                        onConfirm={() => {
                            setIsLoading(true).then(() => {
                                deleteNode(link).then(() => {
                                    fetchMenus().then(() => {
                                        setIsLoading(false).then(() => {
                                            addToastNotification({
                                                title: 'Remove success.',
                                                text: `Link ID: ${link.id} has been removed from Menu ID: ${menu.id}.`,
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
                        <p>Are you sure to delete this Link from Menu?</p>
                    </ModalConfirm>
                )}
            </NotificationsManager>
        )
    }
}

export default ModalDeleteMenuLink
