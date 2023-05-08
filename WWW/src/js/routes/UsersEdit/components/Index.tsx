import * as React from 'react'
import { RouteManager, UsersManager, NotificationsManager, TitleManager, AuthorizationManager } from '../../../containers'
import { Col, Modal, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Details from './Details/Details'
import Edit from './Edit/Edit'
import AddRole from './AddRole/AddRole'
import Roles from './Roles/Roles'
import Permissions from './Permissions/Permissions'
import AddPermission from './AddPermission/AddPermission'

interface UsersViewState {}

export class UsersView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <TitleManager>
                                {({ setTitleSegments }) => (
                                    <AuthorizationManager>
                                        {({ canByPermission }) => (
                                            <Modal.Manager>
                                                {({ registerModal, openModal, closeModal }) => {
                                                    setTitleSegments(['Users', 'Edit User'])

                                                    return (
                                                        <UsersManager id={query['id']} getRoles getPermissions>
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
                                                                deleteAvatar,
                                                                roles,
                                                                deletePermission,
                                                                permissions,
                                                                addUserPermission,
                                                                deleteUserPermission,
                                                                fetchPermissions,
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
                                                                            addToastNotification={addToastNotification}
                                                                            registerModal={registerModal}
                                                                            openModal={openModal}
                                                                            closeModal={closeModal}
                                                                            canByPermission={canByPermission}
                                                                        />
                                                                        <Row>
                                                                            <Col xs={12} md={6}>
                                                                                <Edit
                                                                                    editUser={editUser}
                                                                                    user={user}
                                                                                    fetchOne={fetchOne}
                                                                                    isLoading={isLoading}
                                                                                    addToastNotification={addToastNotification}
                                                                                    setIsLoading={setIsLoading}
                                                                                    canByPermission={canByPermission}
                                                                                />
                                                                            </Col>
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
                                                                                    addToastNotification={addToastNotification}
                                                                                    deleteAvatar={deleteAvatar}
                                                                                    registerModal={registerModal}
                                                                                    openModal={openModal}
                                                                                    closeModal={closeModal}
                                                                                    canByPermission={canByPermission}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xs={12} md={6}>
                                                                                {canByPermission('users.list_roles') && (
                                                                                    <Roles
                                                                                        roles={roles}
                                                                                        setIsLoading={setIsLoading}
                                                                                        deleteUserRole={deleteUserRole}
                                                                                        deletePermission={deletePermission}
                                                                                        fetchOne={fetchOne}
                                                                                        user={user}
                                                                                        isLoading={isLoading}
                                                                                        navigate={navigate}
                                                                                        addToastNotification={addToastNotification}
                                                                                        openModal={openModal}
                                                                                        closeModal={closeModal}
                                                                                        registerModal={registerModal}
                                                                                    />
                                                                                )}
                                                                            </Col>
                                                                            <Col xs={12} md={6}>
                                                                                {canByPermission('users.add_role') && (
                                                                                    <AddRole
                                                                                        roles={roles}
                                                                                        setIsLoading={setIsLoading}
                                                                                        addUserRole={addUserRole}
                                                                                        fetchOne={fetchOne}
                                                                                        user={user}
                                                                                        isLoading={isLoading}
                                                                                        addToastNotification={addToastNotification}
                                                                                    />
                                                                                )}
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xs={12} md={6}>
                                                                                {canByPermission('users.list_permissions') && (
                                                                                    <Permissions
                                                                                        roles={roles}
                                                                                        setIsLoading={setIsLoading}
                                                                                        deletePermission={deletePermission}
                                                                                        fetchOne={fetchOne}
                                                                                        user={user}
                                                                                        isLoading={isLoading}
                                                                                        deleteUserPermission={deleteUserPermission}
                                                                                        fetchPermissions={fetchPermissions}
                                                                                        openModal={openModal}
                                                                                        registerModal={registerModal}
                                                                                        closeModal={closeModal}
                                                                                    />
                                                                                )}
                                                                            </Col>
                                                                            <Col xs={12} md={6}>
                                                                                {canByPermission('users.add_permission') && (
                                                                                    <AddPermission
                                                                                        permissions={permissions}
                                                                                        setIsLoading={setIsLoading}
                                                                                        addUserPermission={addUserPermission}
                                                                                        fetchOne={fetchOne}
                                                                                        user={user}
                                                                                        isLoading={isLoading}
                                                                                        addToastNotification={addToastNotification}
                                                                                    />
                                                                                )}
                                                                            </Col>
                                                                        </Row>
                                                                    </PageContent>
                                                                )
                                                            }}
                                                        </UsersManager>
                                                    )
                                                }}
                                            </Modal.Manager>
                                        )}
                                    </AuthorizationManager>
                                )}
                            </TitleManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
