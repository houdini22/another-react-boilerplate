import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, Col, LoadingOverlay, Modal, Row } from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
import AddModal from './AddRole/AddModal'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import AddPermissionModal from './AddPermission/AddPermissionModal'
import { ListManager } from '../../../components/common/List/ListManager'
import RolesTable from './RolesTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './RolesFilters'
import { ifDeepDiff } from '../../../utils/javascript'
import Header from './Header'

export class UsersView extends React.Component {
    state = {
        confirmDeleteModalVisible: false,
        edit: false,
        addModalVisible: false,
        addPermissionModalVisible: false,
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

    closePermissionsModal() {
        return new Promise((resolve) => {
            this.setState(
                {
                    addPermissionModalVisible: false,
                },
                () => {
                    resolve()
                },
            )
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

    openDeleteModal(roleId) {
        this.setState({
            confirmDeleteModalVisible: roleId,
        })
    }

    openEditModal(roleId) {
        this.setState({
            edit: roleId,
        })
    }

    render() {
        const { confirmDeleteModalVisible, addModalVisible, addPermissionModalVisible } = this.state

        return (
            <RouteManager>
                {({ navigate, query: { user = '', permissions: permissionsFromUri = '' } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <UserRolesManager>
                                {({
                                    deleteRole,
                                    setIsLoading,
                                    deletePermission,
                                    deleteRolePermission,
                                    deleteUserRole,
                                    permissions,
                                    roles,
                                }) => {
                                    const defaultFilters = {
                                        items_per_page: 15,
                                        order_by: 'id',
                                        order_direction: 'asc',
                                        permissions: [],
                                        has_permissions: 'yes_or_no',
                                        users: 'yes_or_no',
                                        user: '',
                                        roles: [],
                                        search: '',
                                    }

                                    return (
                                        <ListManager
                                            url={'/roles/list'}
                                            defaultFilters={defaultFilters}
                                            urlFilters={{
                                                user,
                                                permissions: permissionsFromUri
                                                    ? permissionsFromUri.split(',').map((n) => Number(n))
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
                                                    <AddModal
                                                        visible={addModalVisible}
                                                        close={() => this.closeAddModal()}
                                                        fetch={fetch}
                                                        addToastNotification={addToastNotification}
                                                    />
                                                    <AddPermissionModal
                                                        visible={addPermissionModalVisible}
                                                        close={() => this.closePermissionsModal()}
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
                                                                            deleteRole(confirmDeleteModalVisible).then(
                                                                                () => {
                                                                                    fetch().then(() => {
                                                                                        this.closeDeleteModal()
                                                                                        addToastNotification({
                                                                                            title: 'Delete success.',
                                                                                            text: 'Role has been deleted.',
                                                                                            type: 'success',
                                                                                        })
                                                                                    })
                                                                                },
                                                                            )
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

                                                    <Card
                                                        name={'UserRolesList'}
                                                        header={<h1>Filters</h1>}
                                                        withMinimizeIcon
                                                        headerActions={[
                                                            <Button
                                                                color={'secondary'}
                                                                onClick={() => resetFilters()}
                                                                disabled={!ifDeepDiff(defaultFilters, filters)}
                                                            >
                                                                Reset Filters
                                                            </Button>,
                                                            <Button
                                                                color={'success'}
                                                                onClick={() => restoreFilters('roles')}
                                                            >
                                                                Restore Filters
                                                            </Button>,
                                                            <Button
                                                                color={'warning'}
                                                                onClick={() => saveFilters('roles')}
                                                                disabled={!ifDeepDiff(defaultFilters, filters)}
                                                            >
                                                                Save Filters
                                                            </Button>,
                                                        ]}
                                                    >
                                                        <RolesFilters
                                                            filters={filters}
                                                            setFilter={setFilter}
                                                            fetch={fetch}
                                                            permissions={permissions}
                                                            roles={roles}
                                                            defaultFilters={defaultFilters}
                                                        />
                                                        {isLoading && <LoadingOverlay />}
                                                    </Card>

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
                                                        <RolesTable
                                                            setIsLoading={setIsLoading}
                                                            roles={data}
                                                            deleteRolePermission={deleteRolePermission}
                                                            deleteUserRole={deleteUserRole}
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

export default UsersView
