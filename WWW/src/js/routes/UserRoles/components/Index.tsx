import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, LoadingOverlay, Modal } from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
import AddModal from './AddRole/AddModal'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { ListManager } from '../../../components/common/List/ListManager'
import RolesTable from './RolesTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './RolesFilters'
import { ifDeepDiff } from '../../../utils/javascript'
import Header from './Header'

export class UsersView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { user = '', permissions: permissionsFromUri = '' } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <Modal.Manager>
                                {({ openModal, registerModal, closeModal }) => (
                                    <UserRolesManager>
                                        {({
                                            deleteRole,
                                            setIsLoading,
                                            deletePermission,
                                            deleteRolePermission,
                                            deleteUserRole,
                                            permissions,
                                            roles,
                                            addRole,
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
                                                    }) => {
                                                        registerModal(
                                                            'add-role',
                                                            <AddModal
                                                                fetch={fetch}
                                                                addToastNotification={addToastNotification}
                                                                close={() => closeModal('add-role')}
                                                                setIsLoading={setIsLoading}
                                                                isLoading={isLoading}
                                                                addRole={addRole}
                                                            />,
                                                        )

                                                        return (
                                                            <PageContent>
                                                                <Header openModal={openModal} />

                                                                <Card
                                                                    name={'UserRolesList'}
                                                                    header={<h1>Filters</h1>}
                                                                    withMinimizeIcon
                                                                    headerActions={[
                                                                        <Button
                                                                            color={'secondary'}
                                                                            onClick={() => resetFilters()}
                                                                            disabled={
                                                                                !ifDeepDiff(defaultFilters, filters)
                                                                            }
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
                                                                            disabled={
                                                                                !ifDeepDiff(defaultFilters, filters)
                                                                            }
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
                                                                        page={page}
                                                                        perPage={perPage}
                                                                        total={total}
                                                                        totalPages={totalPages}
                                                                        navigate={navigate}
                                                                        openModal={openModal}
                                                                        registerModal={registerModal}
                                                                        closeModal={closeModal}
                                                                        deleteRole={deleteRole}
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

export default UsersView
