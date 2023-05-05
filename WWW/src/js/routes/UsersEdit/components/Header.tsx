import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { User } from '../../../../types.d'
import { ModalConfirm } from '../../../components/common/ModalConfirm'

interface HeaderProps {
    user: User
    navigate: Function
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const {
            user,
            isLoading,
            setIsLoading,
            sendActivationEmail,
            fetchOne,
            forceLogin,
            activateUser,
            deactivateUser,
            addToastNotification,
            registerModal,
            openModal,
            closeModal,
            canByPermission,
        } = this.props

        registerModal(
            'user-send-activation-email',
            <ModalConfirm
                onConfirm={() => {
                    setIsLoading(true)

                    sendActivationEmail(user).then(() => {
                        Promise.all([fetchOne(user['id'])]).then(() => {
                            setIsLoading(false)
                            addToastNotification({
                                type: 'success',
                                title: 'Send success.',
                                text: `Activation email has been sent to User ID: ${user.id}.`,
                                href: `/users/edit?id=${user.id}`,
                            })
                            closeModal('user-send-activation-email')
                        })
                    })
                }}
                onCancel={() => closeModal('user-send-activation-email')}
            >
                <p>Are you sure to force activation on this account?</p>
            </ModalConfirm>,
        )

        registerModal(
            'user-force-login',
            <ModalConfirm
                onConfirm={() => {
                    setIsLoading(true)

                    forceLogin(user).then(() => {
                        Promise.all([fetchOne(user['id'])]).then(() => {
                            addToastNotification({
                                type: 'success',
                                title: `Force login success.`,
                                text: `User ID: ${user.id} was logged out.`,
                                href: `/users/edit?id=${user.id}`,
                            })
                            setIsLoading(false)
                            closeModal('user-force-login')
                        })
                    })
                }}
                onCancel={() => closeModal('user-force-login')}
            >
                <p>Are you sure to force login on this account?</p>
            </ModalConfirm>,
        )

        registerModal(
            'user-activate',
            <ModalConfirm
                onConfirm={() => {
                    setIsLoading(true)

                    activateUser(user).then(() => {
                        fetchOne(user['id'])
                        addToastNotification({
                            type: 'success',
                            title: 'Activate success.',
                            text: `User ID: ${user.id} has now active account.`,
                            href: `/users/edit?id=${user.id}`,
                        })
                        setIsLoading(false)
                        closeModal('user-activate')
                    })
                }}
                onCancel={() => closeModal('user-activate')}
            >
                <p>Are you sure to activate this account?</p>
            </ModalConfirm>,
        )

        registerModal(
            'user-deactivate',
            <ModalConfirm
                onConfirm={() => {
                    setIsLoading(true)

                    deactivateUser(user).then(() => {
                        fetchOne(user['id'])
                        addToastNotification({
                            type: 'success',
                            title: 'Deactivate success.',
                            text: `User ID: ${user.id} has now not active account.`,
                            href: `/users/edit?id=${user.id}`,
                        })
                        setIsLoading(false)
                        closeModal('user-deactivate')
                    })
                }}
                onCancel={() => closeModal('user-deactivate')}
            >
                <p>Are you sure to deactivate this account?</p>
            </ModalConfirm>,
        )

        return (
            <PageHeader.Container>
                <PageHeader.Title>Edit User</PageHeader.Title>
                <PageHeader.Actions>
                    {canByPermission('users.force_activation') && (
                        <Button
                            isLoading={isLoading}
                            size={'xs'}
                            color={'warning'}
                            onClick={() => {
                                openModal('user-send-activation-email')
                            }}
                        >
                            Force Activation
                        </Button>
                    )}
                    {canByPermission('users.force_login') && (
                        <Button
                            isLoading={isLoading}
                            size={'xs'}
                            disabled={!user.last_active && !user.token}
                            onClick={() => {
                                openModal('user-force-login')
                            }}
                        >
                            Force Login
                        </Button>
                    )}

                    {user.status === 0 && canByPermission('users.change_status') && (
                        <Button
                            color={'success'}
                            onClick={() => {
                                openModal('user-activate')
                            }}
                            isLoading={isLoading}
                        >
                            Activate
                        </Button>
                    )}
                    {user.status !== 0 && canByPermission('users.change_status') && (
                        <Button
                            color={'danger'}
                            onClick={() => {
                                openModal('user-deactivate')
                            }}
                            isLoading={isLoading}
                        >
                            Deactivate
                        </Button>
                    )}
                </PageHeader.Actions>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/users">Users</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href={`/users/edit?id=${user['id']}`}>
                        Edit User
                    </PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
