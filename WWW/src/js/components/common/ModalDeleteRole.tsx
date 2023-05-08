import * as React from 'react'
import { NotificationsManager } from '../../containers/NotificationsManager'
import { ModalConfirm } from './ModalConfirm'
import { DeleteRole, Role, SetIsLoading } from '../../../types.d'

interface ModalDeleteRoleProps {
    setIsLoading: SetIsLoading
    deleteRole: DeleteRole
    fetch: () => Promise<void>
    close: () => void
    role: Role
}

export class ModalDeleteRole extends React.Component<ModalDeleteRoleProps, null> {
    render() {
        const { setIsLoading, deleteRole, fetch, close, role } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <ModalConfirm
                        onConfirm={() => {
                            setIsLoading(true).then(() => {
                                deleteRole(role).then(
                                    () => {
                                        fetch().then(
                                            () => {
                                                addToastNotification({
                                                    title: 'Remove success.',
                                                    text: `Role ID: ${role.id} has been removed.`,
                                                    type: 'success',
                                                    href: '/roles',
                                                })
                                                close()
                                                setIsLoading(false)
                                            },
                                            () => {
                                                close()
                                                setIsLoading(false)
                                            },
                                        )
                                    },
                                    () => {
                                        close()
                                        setIsLoading(false)
                                    },
                                )
                            })
                        }}
                        onCancel={() => close()}
                    >
                        <p>
                            Are you sure to delete Role: <b>{role.name}</b>?
                        </p>
                    </ModalConfirm>
                )}
            </NotificationsManager>
        )
    }
}

export default ModalDeleteRole
