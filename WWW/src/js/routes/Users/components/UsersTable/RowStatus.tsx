import * as React from 'react'
import { Label, Tooltip } from '../../../../components'
import { ActivateUser, DeactivateUser, SetIsLoading, User } from '../../../../../types.d'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { ModalManager } from '../../../../components/ui/Modal'
import { AuthorizationManager, NotificationsManager } from '../../../../containers'

interface RowStatusProps {
    user: User
    activateUser: ActivateUser
    deactivateUser: DeactivateUser
    fetch: () => Promise<void>
    setIsLoading: SetIsLoading
}

export class RowStatus extends React.Component<RowStatusProps, null> {
    render() {
        const { user, activateUser, deactivateUser, fetch, setIsLoading } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <ModalManager>
                                {({ registerModal, openModal, closeModal }) => {
                                    registerModal(
                                        `user-activate-${user.id}`,
                                        <ModalConfirm
                                            onConfirm={() => {
                                                setIsLoading(true).then(() => {
                                                    activateUser(user).then(() => {
                                                        fetch().then(() => {
                                                            addToastNotification({
                                                                title: 'Activate success.',
                                                                text: `User ID: ${user.id} account has been activated.`,
                                                                type: 'success',
                                                                href: '/users',
                                                            })
                                                            closeModal(`user-activate-${user.id}`)
                                                            setIsLoading(false)
                                                        })
                                                    })
                                                })
                                            }}
                                            onCancel={() => {
                                                closeModal(`user-activate-${user.id}`)
                                            }}
                                        >
                                            <p>
                                                Are you sure to activate Account: <b>{user.name}</b>?
                                            </p>
                                        </ModalConfirm>,
                                    )

                                    registerModal(
                                        `user-deactivate-${user.id}`,
                                        <ModalConfirm
                                            onConfirm={() => {
                                                setIsLoading(true).then(() => {
                                                    deactivateUser(user).then(() => {
                                                        fetch().then(() => {
                                                            addToastNotification({
                                                                title: 'Deactivate success.',
                                                                text: `User ID: ${user.id} account has been deactivated.`,
                                                                type: 'success',
                                                                href: '/users',
                                                            })
                                                            closeModal(`user-deactivate-${user.id}`)
                                                            setIsLoading(false)
                                                        })
                                                    })
                                                })
                                            }}
                                            onCancel={() => {
                                                closeModal(`user-deactivate-${user.id}`)
                                            }}
                                        >
                                            <p>
                                                Are you sure to deactivate Account: <b>{user.name}</b>?
                                            </p>
                                        </ModalConfirm>,
                                    )

                                    return (
                                        <>
                                            {user.status === 0 && (
                                                <Tooltip tooltip={`Activate User Account`}>
                                                    <Label
                                                        color={'danger'}
                                                        onClick={() => {
                                                            if (canByPermission('users.change_status')) {
                                                                openModal(`user-activate-${user.id}`)
                                                            }
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                        block
                                                    >
                                                        Not Active
                                                    </Label>
                                                </Tooltip>
                                            )}
                                            {user.status === 1 && (
                                                <Tooltip tooltip={'Deactivate User account'}>
                                                    <Label
                                                        color={'success'}
                                                        onClick={() => {
                                                            if (canByPermission('users.change_status')) {
                                                                openModal(`user-deactivate-${user.id}`)
                                                            }
                                                        }}
                                                        block
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        Active
                                                    </Label>
                                                </Tooltip>
                                            )}
                                        </>
                                    )
                                }}
                            </ModalManager>
                        )}
                    </NotificationsManager>
                )}
            </AuthorizationManager>
        )
    }
}

export default RowStatus
