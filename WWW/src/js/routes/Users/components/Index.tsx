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
import { FaHome as HomeIcon } from 'react-icons/fa'

interface UsersViewState {
    deleteUserId: number | boolean
    editUserId: number | boolean
    addUser: number | boolean
}

export class UsersView extends React.Component<null, UsersViewState> {
    state: UsersViewState = {
        deleteUserId: false,
        editUserId: false,
        addUser: false,
    }

    setUserToEdit(id) {
        this.setState({
            editUserId: id,
        })
    }

    setUserToDelete(id) {
        this.setState({
            deleteUserId: id,
        })
    }

    setUserAdd(val) {
        this.setState({
            addUser: val,
        })
    }

    render() {
        const { deleteUserId, editUserId, addUser } = this.state
        const defaultFilters = {
            order_by: 'id',
            order_direction: 'asc',
            items_per_page: 15,
            search: '',
            status: 'active_or_not_active',
            avatar: 'has_or_has_not',
            roles: [],
            permissions: [],
            files: 'yes_or_no',
        }
        return (
            <RouteManager>
                {({ navigate }) => (
                    <UserRolesManager>
                        {({ roles, deleteRole, permissions }) => (
                            <ListManager url={'/users/list'} defaultFilters={defaultFilters}>
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
                                                    <PageHeader.Container>
                                                        <PageHeader.Title>Users</PageHeader.Title>
                                                        <PageHeader.Actions>
                                                            <Button
                                                                color={'success'}
                                                                onClick={() => navigate('/users/add')}
                                                            >
                                                                Add
                                                            </Button>
                                                        </PageHeader.Actions>
                                                        <PageHeader.Breadcrumbs>
                                                            <PageHeader.BreadcrumbsItem href="/">
                                                                <HomeIcon /> Home
                                                            </PageHeader.BreadcrumbsItem>
                                                            <PageHeader.BreadcrumbsItem href="/users">
                                                                Users
                                                            </PageHeader.BreadcrumbsItem>
                                                        </PageHeader.Breadcrumbs>
                                                    </PageHeader.Container>
                                                    <Card
                                                        header={<h1>Filters</h1>}
                                                        headerActions={[
                                                            <Button
                                                                color={'secondary'}
                                                                onClick={() => resetFilters()}
                                                                disabled={!ifDeepDiff(defaultFilters, filters)}
                                                            >
                                                                Reset Filters
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
                                                            setUserToEdit={this.setUserToEdit.bind(this)}
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
                                                    </Card>
                                                    {isLoading && <LoadingOverlay />}
                                                </PageContent>
                                            )
                                        }}
                                    </UsersManager>
                                )}
                            </ListManager>
                        )}
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
