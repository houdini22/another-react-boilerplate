import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { User } from '../../../../types.d'

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
        } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Users - edit User</PageHeader.Title>
                <PageHeader.Actions>
                    <Button
                        isLoading={isLoading}
                        size={'xs'}
                        color={'warning'}
                        onClick={() => {
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
                                })
                            })
                        }}
                    >
                        Force Activation
                    </Button>
                    <Button
                        isLoading={isLoading}
                        size={'xs'}
                        disabled={!user.last_active && !user.token}
                        onClick={() => {
                            forceLogin(user).then(() => {
                                Promise.all([fetchOne(user['id'])]).then(() => {
                                    addToastNotification({
                                        type: 'success',
                                        title: `Force login success.`,
                                        text: `User ID: ${user.id} was logged out.`,
                                        href: `/users/edit?id=${user.id}`,
                                    })
                                })
                            })
                        }}
                    >
                        Force Login
                    </Button>
                    {user.status === 0 && (
                        <Button
                            color={'success'}
                            onClick={() => {
                                activateUser(user).then(() => {
                                    fetchOne(user['id'])
                                    addToastNotification({
                                        type: 'success',
                                        title: 'Activate success.',
                                        text: `User ID: ${user.id} has now active account.`,
                                        href: `/users/edit?id=${user.id}`,
                                    })
                                })
                            }}
                            isLoading={isLoading}
                        >
                            Activate
                        </Button>
                    )}
                    {user.status !== 0 && (
                        <Button
                            color={'danger'}
                            onClick={() => {
                                deactivateUser(user).then(() => {
                                    fetchOne(user['id'])
                                    addToastNotification({
                                        type: 'success',
                                        title: 'Deactivate success.',
                                        text: `User ID: ${user.id} has now not active account.`,
                                        href: `/users/edit?id=${user.id}`,
                                    })
                                })
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
                        Users - Edit User
                    </PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
