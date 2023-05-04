import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Modal, Row } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Details from './Details/Details'
import Edit from './Edit/Edit'
import AddRole from './AddRole/AddRole'
import Roles from './Roles/Roles'
import Permissions from './Permissions/Permissions'
import AddPermission from './AddPermission/AddPermission'
import { NotificationsManager } from '../../../containers/NotificationsManager'

interface UsersViewState {}

export class UsersView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <Modal.Manager>
                                    {({ registerModal, openModal, closeModal }) => (
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
                                                                    addToastNotification={addToastNotification}
                                                                    deleteAvatar={deleteAvatar}
                                                                    registerModal={registerModal}
                                                                    openModal={openModal}
                                                                    closeModal={closeModal}
                                                                />
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <Edit
                                                                    editUser={editUser}
                                                                    user={user}
                                                                    fetchOne={fetchOne}
                                                                    isLoading={isLoading}
                                                                    addToastNotification={addToastNotification}
                                                                    setIsLoading={setIsLoading}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={6}>
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
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <AddRole
                                                                    roles={roles}
                                                                    setIsLoading={setIsLoading}
                                                                    addUserRole={addUserRole}
                                                                    fetchOne={fetchOne}
                                                                    user={user}
                                                                    isLoading={isLoading}
                                                                    addToastNotification={addToastNotification}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={6}>
                                                                <Permissions
                                                                    roles={roles}
                                                                    setIsLoading={setIsLoading}
                                                                    deletePermission={deletePermission}
                                                                    fetchOne={fetchOne}
                                                                    user={user}
                                                                    isLoading={isLoading}
                                                                    navigate={navigate}
                                                                    deleteUserPermission={deleteUserPermission}
                                                                    fetchPermissions={fetchPermissions}
                                                                    addToastNotification={addToastNotification}
                                                                    openModal={openModal}
                                                                    registerModal={registerModal}
                                                                    closeModal={closeModal}
                                                                />
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <AddPermission
                                                                    permissions={permissions}
                                                                    setIsLoading={setIsLoading}
                                                                    addUserPermission={addUserPermission}
                                                                    fetchOne={fetchOne}
                                                                    user={user}
                                                                    isLoading={isLoading}
                                                                    addToastNotification={addToastNotification}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </PageContent>
                                                )
                                            }}
                                        </UsersManager>
                                    )}
                                </Modal.Manager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
