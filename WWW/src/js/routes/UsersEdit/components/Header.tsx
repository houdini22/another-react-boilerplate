import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    user: Object
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
        } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>Users - edit user</PageHeader.Title>
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
                                Promise.all([fetchOne(user['id'])]).then(() => {})
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
                                })
                            }}
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
                                })
                            }}
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
