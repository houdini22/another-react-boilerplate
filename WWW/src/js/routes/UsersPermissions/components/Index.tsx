import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, LoadingOverlay, Modal } from '../../../components'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { ListManager } from '../../../components/common/List/ListManager'
import PermissionsTable from './PermissionsTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './PermissionsFilters'
import Header from './Header'

export class UsersPermissions extends React.Component {
    render() {
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
                                            return (
                                                <ListManager
                                                    url={'/permissions/list'}
                                                    defaultFilters={{
                                                        items_per_page: 15,
                                                        order_by: 'id',
                                                        order_direction: 'asc',
                                                        roles: [],
                                                        has_roles: 'yes_or_no',
                                                        has_users: 'yes_or_no',
                                                        user: '',
                                                        search: '',
                                                    }}
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
                                                        defaultFilters,
                                                        setFilters,
                                                    }) => {
                                                        return (
                                                            <PageContent>
                                                                <Header navigate={navigate} />

                                                                <RolesFilters
                                                                    filters={filters}
                                                                    setFilter={setFilter}
                                                                    fetch={fetch}
                                                                    permissions={permissions}
                                                                    roles={roles}
                                                                    resetFilters={resetFilters}
                                                                    restoreFilters={restoreFilters}
                                                                    defaultFilters={defaultFilters}
                                                                    setFilters={setFilters}
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
