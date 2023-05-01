import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Col, Row } from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Details from './Details/Details'
import Edit from './Edit/Edit'
import AddRole from './AddRole/AddRole'
import Roles from './Roles/Roles'
import Permissions from './Permissions/Permissions'

interface UsersViewState {}

export class UsersView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <UserRolesManager>
                        {({ roles, deletePermission }) => (
                            <UsersManager id={query['id']}>
                                {({
                                    user,
                                    isLoading,
                                    setIsLoading,
                                    editUser,
                                    fetchOne,
                                    addUserRole,
                                    deleteUserRole,
                                    sendActivationEmail,
                                    sendAvatar,
                                    forceLogin,
                                    uploadProgress,
                                    setUploadProgress,
                                    activateUser,
                                    deactivateUser,
                                }) => {
                                    return (
                                        <PageContent>
                                            <Header
                                                forceLogin={forceLogin}
                                                user={user}
                                                navigate={navigate}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                sendActivationEmail={sendActivationEmail}
                                                fetchOne={fetchOne}
                                                activateUser={activateUser}
                                                deactivateUser={deactivateUser}
                                            />
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Details
                                                        user={user}
                                                        navigate={navigate}
                                                        setUploadProgress={setUploadProgress}
                                                        setIsLoading={setIsLoading}
                                                        uploadProgress={uploadProgress}
                                                        sendAvatar={sendAvatar}
                                                        fetchOne={fetchOne}
                                                        forceLogin={forceLogin}
                                                        sendActivationEmail={sendActivationEmail}
                                                        isLoading={isLoading}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Edit
                                                        editUser={editUser}
                                                        user={user}
                                                        fetchOne={fetchOne}
                                                        isLoading={isLoading}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <AddRole
                                                        roles={roles}
                                                        setIsLoading={setIsLoading}
                                                        addUserRole={addUserRole}
                                                        fetchOne={fetchOne}
                                                        user={user}
                                                        isLoading={isLoading}
                                                    />
                                                    <Roles
                                                        roles={roles}
                                                        setIsLoading={setIsLoading}
                                                        deleteUserRole={deleteUserRole}
                                                        fetchOne={fetchOne}
                                                        user={user}
                                                        isLoading={isLoading}
                                                    />
                                                    <Permissions
                                                        roles={roles}
                                                        setIsLoading={setIsLoading}
                                                        deletePermission={deletePermission}
                                                        fetchOne={fetchOne}
                                                        user={user}
                                                        isLoading={isLoading}
                                                    />
                                                </Col>
                                            </Row>
                                        </PageContent>
                                    )
                                }}
                            </UsersManager>
                        )}
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
