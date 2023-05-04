import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, LoadingOverlay, Modal } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { ListManager } from '../../../components/common/List/ListManager'
import { Pagination } from '../../../components/common/List/Pagination'
import UsersTable from './UsersTable'
import UsersFilters from './UsersFilters'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import Header from './Header'

interface UsersViewState {
    deleteUserId: number | boolean
}

export class UsersView extends React.Component<null, UsersViewState> {
    render() {
        const defaultFilters = {
            order_by: 'id',
            order_direction: 'asc',
            items_per_page: 15,
            search: '',
            status: 'yes_or_no',
            avatar: 'yes_or_no',
            roles: [],
            permissions: [],
            files: 'yes_or_no',
            has_roles: 'yes_or_no',
            has_permissions: 'yes_or_no',
        }
        return (
            <RouteManager>
                {({ navigate, query: { roles: rolesFromUri = '', permissions: permissionsFromUri = '' } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <Modal.Manager>
                                {({ registerModal, closeModal, openModal }) => {
                                    return (
                                        <UsersManager getRoles getPermissions>
                                            {({
                                                roles,
                                                permissions,
                                                deleteUserPermission,
                                                deleteUser,
                                                deleteUserRole,
                                                activateUser,
                                                deactivateUser,
                                                isLoading,
                                            }) => {
                                                return (
                                                    <ListManager
                                                        url={'/users/list'}
                                                        defaultFilters={defaultFilters}
                                                        urlFilters={{
                                                            roles: rolesFromUri
                                                                ? rolesFromUri.split(',').map((n) => Number(n))
                                                                : [],
                                                            permissions: permissionsFromUri
                                                                ? permissionsFromUri.split(',').map((n) => Number(n))
                                                                : [],
                                                        }}
                                                    >
                                                        {({
                                                            fetch,
                                                            setFilter,
                                                            filters,
                                                            data,
                                                            total,
                                                            hasPrevPage,
                                                            hasNextPage,
                                                            totalPages,
                                                            page,
                                                            isLoading: isLoading2,
                                                            setPage,
                                                            perPage,
                                                            resetFilters,
                                                            links,
                                                            setIsLoading,
                                                            setFilters,
                                                        }) => {
                                                            return (
                                                                <PageContent>
                                                                    <Header navigate={navigate} />
                                                                    <UsersFilters
                                                                        filters={filters}
                                                                        setFilter={setFilter}
                                                                        fetch={fetch}
                                                                        roles={roles}
                                                                        permissions={permissions}
                                                                        resetFilters={resetFilters}
                                                                        defaultFilters={defaultFilters}
                                                                        isLoading={isLoading || isLoading2}
                                                                        setFilters={setFilters}
                                                                        setIsLoading={setIsLoading}
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
                                                                        <UsersTable
                                                                            users={data}
                                                                            setIsLoading={setIsLoading}
                                                                            deleteUserRole={deleteUserRole}
                                                                            deleteUserPermission={deleteUserPermission}
                                                                            fetch={fetch}
                                                                            activateUser={activateUser}
                                                                            deactivateUser={deactivateUser}
                                                                            page={page}
                                                                            perPage={perPage}
                                                                            total={total}
                                                                            totalPages={totalPages}
                                                                            addToastNotification={addToastNotification}
                                                                            registerModal={registerModal}
                                                                            closeModal={closeModal}
                                                                            openModal={openModal}
                                                                            deleteUser={deleteUser}
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
                                                                        {(isLoading || isLoading2) && (
                                                                            <LoadingOverlay />
                                                                        )}
                                                                    </Card>
                                                                </PageContent>
                                                            )
                                                        }}
                                                    </ListManager>
                                                )
                                            }}
                                        </UsersManager>
                                    )
                                }}
                            </Modal.Manager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
