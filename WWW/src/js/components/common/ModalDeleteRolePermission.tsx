import * as React from 'react'
import { NotificationsManager } from '../../containers/NotificationsManager'
import { ModalConfirm } from './ModalConfirm'
import { Role, SetIsLoading } from '../../../types.d'
import { DeleteRolePermission, Permission } from '../../../types.d'

interface ModalDeleteRolePermissionProps {
    setIsLoading: SetIsLoading
    fetch: () => Promise<void>
    close: () => void
    role: Role
    deleteRolePermission: DeleteRolePermission
    permission: Permission
}

export class ModalDeleteRolePermission extends React.Component<ModalDeleteRolePermissionProps, null> {
    render() {
        const { setIsLoading, deleteRolePermission, fetch, close, role, permission } = this.props
        return (
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <ModalConfirm
                        onConfirm={() => {
                            setIsLoading(true).then(() => {
                                return deleteRolePermission(role, permission).then(
                                    () => {
                                        fetch().then(() => {
                                            addToastNotification({
                                                title: 'Remove success.',
                                                text: `Permission ID: ${permission.id} has been removed from Role ID: ${role.id}.`,
                                                type: 'success',
                                                href: '/roles',
                                            })
                                            close()
                                            setIsLoading(false)
                                        })
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
                            Are you sure to delete Permission: <b>{permission.name}</b> from Role <b>{role.name}</b>?
                        </p>
                    </ModalConfirm>
                )}
            </NotificationsManager>
        )
    }
}

export default ModalDeleteRolePermission
