import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Col,
    Dropdown,
    Label,
    LoadingOverlay,
    Modal,
    PageHeader,
    Row,
    Table,
} from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
import EditModal from './EditModal'
import AddModal from './AddModal'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import AddPermissionModal from './AddPermissionModal'
import { ListManager } from '../../../components/common/List/ListManager'
import RolesTable from './RolesTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './RolesFilters'
import { ifDeepDiff } from '../../../utils/javascript'
import { FaHome as HomeIcon } from 'react-icons/fa'

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

    openPermissionsModal() {
        this.setState({
            addPermissionModalVisible: true,
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
        const { confirmDeleteModalVisible, edit, addModalVisible, addPermissionModalVisible } = this.state

        return (
            <RouteManager>
                {({ navigate, query: { user = '' } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <UserRolesManager>
                                {({
                                    deleteRole,
                                    setIsLoading,
                                    deletePermission,
                                    deleteUserPermission,
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
                                    }

                                    return (
                                        <ListManager
                                            url={'/roles/list'}
                                            defaultFilters={defaultFilters}
                                            urlFilters={{ user }}
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
                                                        close={() => this.closeAddModal().then(() => fetch())}
                                                    />
                                                    <AddPermissionModal
                                                        visible={addPermissionModalVisible}
                                                        close={() => this.closePermissionsModal().then(() => fetch())}
                                                    />
                                                    <EditModal
                                                        visible={typeof edit !== 'boolean'}
                                                        id={edit}
                                                        close={() => this.closeEditModal().then(() => fetch())}
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
                                                    <PageHeader.Container>
                                                        <PageHeader.Title>Roles</PageHeader.Title>
                                                        <PageHeader.Actions>
                                                            <Button
                                                                color={'success'}
                                                                onClick={() => this.openAddModal()}
                                                            >
                                                                Add Role
                                                            </Button>
                                                            <Button
                                                                color={'success'}
                                                                onClick={() => this.openPermissionsModal()}
                                                            >
                                                                Add Permission
                                                            </Button>
                                                        </PageHeader.Actions>
                                                        <PageHeader.Breadcrumbs>
                                                            <PageHeader.BreadcrumbsItem href="/">
                                                                <HomeIcon /> Home
                                                            </PageHeader.BreadcrumbsItem>
                                                            <PageHeader.BreadcrumbsItem href="/users">
                                                                Users
                                                            </PageHeader.BreadcrumbsItem>
                                                            <PageHeader.BreadcrumbsItem href="/roles">
                                                                Roles
                                                            </PageHeader.BreadcrumbsItem>
                                                        </PageHeader.Breadcrumbs>
                                                    </PageHeader.Container>

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
                                                            deleteUserPermission={deleteUserPermission}
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
