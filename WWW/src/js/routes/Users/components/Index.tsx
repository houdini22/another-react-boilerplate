import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, LoadingOverlay, PageHeader } from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import EditModal from './EditModal'
import AddModal from './AddModal'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { ListManager } from '../../../components/common/List/ListManager'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { Pagination } from '../../../components/common/List/Pagination'
import UsersTable from './UsersTable'
import UsersFilters from './UsersFilters'

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

        return (
            <RouteManager>
                {({ navigate }) => (
                    <UserRolesManager>
                        {({ deleteRole }) => (
                            <ListManager
                                url={'/users/list'}
                                defaultFilters={{
                                    order_by: 'id',
                                    order_direction: 'asc',
                                    items_per_page: 15,
                                    search: '',
                                    status: 'active_or_not_active',
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
                                }) => (
                                    <UsersManager>
                                        {({ deleteUser, deleteUserRole, activateUser, deactivateUser }) => {
                                            return (
                                                <PageContent>
                                                    <AddModal visible={addUser} close={() => this.setUserAdd(false)} />
                                                    <EditModal
                                                        visible={typeof editUserId !== 'boolean'}
                                                        id={Number(editUserId)}
                                                        close={() => this.setUserToEdit(false)}
                                                    />
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
                                                                onClick={() => this.setUserAdd(true)}
                                                            >
                                                                Add
                                                            </Button>
                                                        </PageHeader.Actions>
                                                    </PageHeader.Container>
                                                    <UsersFilters
                                                        filters={filters}
                                                        setFilter={setFilter}
                                                        fetch={fetch}
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
