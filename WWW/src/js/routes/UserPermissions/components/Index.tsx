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
import { ifDeepDiff } from '../../../utils/javascript'
import Header from './Header'

export class UsersPermissions extends React.Component {
    state = {
        confirmDeleteModalVisible: false,
        edit: false,
        addModalVisible: false,
    }

    closeAddModal() {
        return new Promise((resolve) => {
            this.setState(
                {
                    addModalVisible: false,
                },
                () => {
                    resolve()
                },
            )
        })
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

    openAddModal() {
        this.setState({
            addModalVisible: true,
        })
    }

    openDeleteModal(permissionsId) {
        this.setState({
            confirmDeleteModalVisible: permissionsId,
        })
    }

    openEditModal(permissionId) {
        this.setState({
            edit: permissionId,
        })
    }

    render() {
        const { confirmDeleteModalVisible, edit, addModalVisible } = this.state

        return (
            <RouteManager>
                {({ navigate, query: { user = '', roles: rolesFromUri } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
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
                                        search: ''
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
                                            }) => (
                                                <PageContent>
                                                    <AddPermissionModal
                                                        visible={addModalVisible}
                                                        close={() => this.closeAddModal()}
                                                        fetch={fetch}
                                                    />
                                                    <EditModal
                                                        visible={typeof edit !== 'boolean'}
                                                        id={edit}
                                                        close={() => this.closeEditModal()}
                                                        fetch={fetch}
                                                    />
                                                    <Modal.Container
                                                        visible={typeof confirmDeleteModalVisible !== 'boolean'}
                                                        color={'danger'}
                                                    >
                                                        <Modal.Header closeIcon close={() => this.closeDeleteModal()}>
                                                            Confirm Delete
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <p>Do you really want to delete this element?</p>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Row>
                                                                <Col xs={6}>
                                                                    <Button
                                                                        color={'secondary'}
                                                                        onClick={() => this.closeDeleteModal()}
                                                                        block
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Button
                                                                        color={'success'}
                                                                        onClick={() => {
                                                                            deletePermission(
                                                                                confirmDeleteModalVisible,
                                                                            ).then(() => {
                                                                                fetch().then(() => {
                                                                                    this.closeDeleteModal()
                                                                                    addToastNotification({
                                                                                        title: 'Delete success.',
                                                                                        text: 'Role has been deleted.',
                                                                                        type: 'success',
                                                                                    })
                                                                                })
                                                                            })
                                                                        }}
                                                                        block
                                                                    >
                                                                        OK
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Modal.Footer>
                                                    </Modal.Container>

                                                    <Header openAddModal={this.openAddModal.bind(this)} />

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
                                                            openDeleteModal={this.openDeleteModal.bind(this)}
                                                            openEditModal={this.openEditModal.bind(this)}
                                                            page={page}
                                                            perPage={perPage}
                                                            total={total}
                                                            totalPages={totalPages}
                                                            navigate={navigate}
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
                                            )}
                                        </ListManager>
                                    )
                                }}
                            </UserRolesManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersPermissions
