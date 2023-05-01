import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, LoadingOverlay, PageHeader } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { ListManager } from '../../../components/common/List/ListManager'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { Pagination } from '../../../components/common/List/Pagination'
import UsersTable from './UsersTable'
import UsersFilters from './UsersFilters'
import { ifDeepDiff } from '../../../utils/javascript'
import Header from './Header'

interface UsersViewState {
    deleteUserId: number | boolean
}

export class UsersView extends React.Component<null, UsersViewState> {
    state: UsersViewState = {
        deleteUserId: false,
    }

    setUserToDelete(id) {
        this.setState({
            deleteUserId: id,
        })
    }

    render() {
        const { deleteUserId } = this.state
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
        }
        return (
            <RouteManager>
                {({ navigate, query: { roles: rolesFromUri = '' } }) => (
                    <UserRolesManager>
                        {({ roles, deleteRole, permissions }) => {
                            return (
                                <ListManager
                                    url={'/users/list'}
                                    defaultFilters={defaultFilters}
                                    urlFilters={{
                                        roles: rolesFromUri ? rolesFromUri.split(',').map((n) => Number(n)) : [],
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
                                        isLoading,
                                        setPage,
                                        perPage,
                                        resetFilters,
                                        links,
                                        setIsLoading,
                                        saveFilters,
                                        restoreFilters,
                                    }) => (
                                        <UsersManager>
                                            {({ deleteUser, deleteUserRole, activateUser, deactivateUser }) => {
                                                return (
                                                    <PageContent>
                                                        <ConfirmDeleteModal
                                                            visible={typeof deleteUserId !== 'boolean'}
                                                            deleteUser={deleteUser}
                                                            id={deleteUserId}
                                                            fetch={fetch}
                                                            close={() => this.setUserToDelete(false)}
                                                        />
                                                        <Header navigate={navigate} />
                                                        <Card
                                                            name={'UsersList'}
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
                                                                    onClick={() => restoreFilters('users')}
                                                                >
                                                                    Restore Filters
                                                                </Button>,
                                                                <Button
                                                                    color={'warning'}
                                                                    onClick={() => saveFilters('users')}
                                                                    disabled={!ifDeepDiff(defaultFilters, filters)}
                                                                >
                                                                    Save Filters
                                                                </Button>,
                                                            ]}
                                                        >
                                                            <UsersFilters
                                                                filters={filters}
                                                                setFilter={setFilter}
                                                                fetch={fetch}
                                                                roles={roles}
                                                                permissions={permissions}
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
                                                            <UsersTable
                                                                users={data}
                                                                setIsLoading={setIsLoading}
                                                                deleteUserRole={deleteUserRole}
                                                                fetch={fetch}
                                                                deleteRole={deleteRole}
                                                                activateUser={activateUser}
                                                                deactivateUser={deactivateUser}
                                                                setUserToDelete={this.setUserToDelete.bind(this)}
                                                                page={page}
                                                                perPage={perPage}
                                                                total={total}
                                                                totalPages={totalPages}
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
                                        </UsersManager>
                                    )}
                                </ListManager>
                            )
                        }}
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
