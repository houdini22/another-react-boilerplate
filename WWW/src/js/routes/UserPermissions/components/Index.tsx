import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, Col, LoadingOverlay, Modal, Row } from '../../../components'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import EditModal from './EditPermission/EditModal'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import AddPermissionModal from './AddPermission/AddPermissionModal'
import { ListManager } from '../../../components/common/List/ListManager'
import PermissionsTable from './PermissionsTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './PermissionsFilters'
import Header from './Header'
import AddModal from '../../UserRoles/components/AddRole/AddModal'

export class UsersPermissions extends React.Component {
    state = {
        confirmDeleteModalVisible: false,
        edit: false,
        addModalVisible: false,
    }
    closeEditModal() {
        return new Promise((resolve) => {
            this.setState({ edit: false }, () => {
                resolve()
            })
        })
    }

    closeDeleteModal() {
        this.setState({
            confirmDeleteModalVisible: false,
        })
    }

    openEditModal(permissionId) {
        this.setState({
            edit: permissionId,
        })
    }

    render() {
        const { edit } = this.state

        return (
            <RouteManager>
                {({ navigate, query: { user = '', roles: rolesFromUri } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <Modal.Manager>
                                {({ registerModal, closeModal, openModal }) => (
                                    <UserRolesManager>
                                        {({
                                            setIsLoading,
                                            deletePermission,
                                            deleteUserPermission,
                                            deleteRolePermission,
                                            deleteUserRole,
                                            permissions,
                                            roles,
                                        }) => {
                                            const defaultFilters = {
                                                items_per_page: 15,
                                                order_by: 'id',
                                                order_direction: 'asc',
                                                roles: [],
                                                has_roles: 'yes_or_no',
                                                has_users: 'yes_or_no',
                                                user: '',
                                                search: '',
                                            }

                                            return (
                                                <ListManager
                                                    url={'/permissions/list'}
                                                    defaultFilters={defaultFilters}
                                                    urlFilters={{
                                                        user,
                                                        roles: rolesFromUri
                                                            ? rolesFromUri.split(',').map((n) => Number(n))
                                                            : [],
                                                    }}
                                                >
                                                    {({
                                                        data,
                                                        isLoading,
                                                        fetch,
                                                        links,
                                                        page,
                                                        setPage,
                                                        hasNextPage,
                                                        hasPrevPage,
                                                        totalPages,
                                                        filters,
                                                        setFilter,
                                                        perPage,
                                                        total,
                                                        resetFilters,
                                                        restoreFilters,
                                                        saveFilters,
                                                    }) => {
                                                        registerModal(
                                                            'add-permission',
                                                            <AddPermissionModal
                                                                close={() => closeModal('add-permission')}
                                                                fetch={fetch}
                                                                addToastNotification={addToastNotification}
                                                            />,
                                                        )

                                                        return (
                                                            <PageContent>
                                                                <EditModal
                                                                    visible={typeof edit !== 'boolean'}
                                                                    id={edit}
                                                                    close={() => this.closeEditModal()}
                                                                    fetch={fetch}
                                                                />

                                                                <Header openModal={openModal} />

                                                                <RolesFilters
                                                                    filters={filters}
                                                                    setFilter={setFilter}
                                                                    fetch={fetch}
                                                                    permissions={permissions}
                                                                    roles={roles}
                                                                    resetFilters={resetFilters}
                                                                    restoreFilters={restoreFilters}
                                                                    saveFilters={saveFilters}
                                                                    defaultFilters={defaultFilters}
                                                                />

                                                                <Card>
                                                                    <Pagination
                                                                        links={links}
                                                                        page={page}
                                                                        fetch={fetch}
                                                                        setPage={setPage}
                                                                        hasNextPage={hasNextPage}
                                                                        hasPrevPage={hasPrevPage}
                                                                        totalPages={totalPages}
                                                                    />
                                                                    <PermissionsTable
                                                                        setIsLoading={setIsLoading}
                                                                        permissions={data}
                                                                        deleteUserPermission={deleteUserPermission}
                                                                        deleteUserRole={deleteUserRole}
                                                                        deleteRolePermission={deleteRolePermission}
                                                                        fetch={fetch}
                                                                        addToastNotification={addToastNotification}
                                                                        deletePermission={deletePermission}
                                                                        openEditModal={this.openEditModal.bind(this)}
                                                                        page={page}
                                                                        perPage={perPage}
                                                                        total={total}
                                                                        totalPages={totalPages}
                                                                        navigate={navigate}
                                                                        openModal={openModal}
                                                                        registerModal={registerModal}
                                                                        closeModal={closeModal}
                                                                    />
                                                                    <Pagination
                                                                        links={links}
                                                                        page={page}
                                                                        fetch={fetch}
                                                                        setPage={setPage}
                                                                        hasNextPage={hasNextPage}
                                                                        hasPrevPage={hasPrevPage}
                                                                        totalPages={totalPages}
                                                                    />
                                                                    {isLoading && <LoadingOverlay />}
                                                                </Card>
                                                            </PageContent>
                                                        )
                                                    }}
                                                </ListManager>
                                            )
                                        }}
                                    </UserRolesManager>
                                )}
                            </Modal.Manager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersPermissions
