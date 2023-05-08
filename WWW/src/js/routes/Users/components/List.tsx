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
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import { FiltersManager } from '../../../containers/FiltersManager'
import { getDefaultFilters } from '../../../helpers/users'
import { splitIds } from '../../../helpers/filters'
import {
    ActivateUser,
    DeactivateUser,
    DeleteSavedFilter,
    DeleteUser,
    DeleteUserAvatar,
    DeleteUserPermission,
    DeleteUserRole,
    Filters,
    PaginationLinks,
    Permission,
    ResetFilters,
    RestoreSavedFilter,
    Role,
    SavedFilters,
    SaveFilters,
    SetFilter,
    SetFilters,
    SetIsLoading,
    SetPage,
    User,
} from '../../../../types.d'

interface ListProps {
    filters: Filters
    setFilter: SetFilter
    resetFilters: ResetFilters
    defaultFilters: Filters
    isLoading: boolean
    setFilters: SetFilters
    savedFilters: SavedFilters
    saveFilters: SaveFilters
    deleteSavedFilter: DeleteSavedFilter
    restoreSavedFilter: RestoreSavedFilter
    links: PaginationLinks
    page: number
    setPage: SetPage
    hasNextPage: boolean
    hasPrevPage: boolean
    totalPages: number
    data: Array<User>
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    deleteUserPermission: DeleteUserPermission
    activateUser: ActivateUser
    deactivateUser: DeactivateUser
    perPage: number
    total: number
    deleteUser: DeleteUser
    deleteAvatar: DeleteUserAvatar
    fetch: () => Promise<void>
    filtersData: Object
}

export class List extends React.Component<ListProps, null> {
    render() {
        const {
            filters,
            setFilter,
            resetFilters,
            defaultFilters,
            isLoading,
            setFilters,
            savedFilters,
            saveFilters,
            deleteSavedFilter,
            restoreSavedFilter,
            links,
            page,
            setPage,
            hasNextPage,
            hasPrevPage,
            totalPages,
            data,
            setIsLoading,
            deleteUserRole,
            deleteUserPermission,
            activateUser,
            deactivateUser,
            perPage,
            total,
            deleteUser,
            deleteAvatar,
            fetch,
            filtersData,
        } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <>
                        {canByPermission('users.list') && (
                            <>
                                <UsersFilters
                                    filters={filters}
                                    setFilter={setFilter}
                                    resetFilters={resetFilters}
                                    defaultFilters={defaultFilters}
                                    isLoading={isLoading}
                                    setFilters={setFilters}
                                    savedFilters={savedFilters}
                                    saveFilters={saveFilters}
                                    deleteSavedFilter={deleteSavedFilter}
                                    restoreSavedFilter={restoreSavedFilter}
                                    filtersData={filtersData}
                                />
                                <Card>
                                    <Pagination
                                        links={links}
                                        page={page}
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
                                        deleteUser={deleteUser}
                                        deleteAvatar={deleteAvatar}
                                    />
                                    <Pagination
                                        links={links}
                                        page={page}
                                        setPage={setPage}
                                        hasNextPage={hasNextPage}
                                        hasPrevPage={hasPrevPage}
                                        totalPages={totalPages}
                                    />
                                    {isLoading && <LoadingOverlay />}
                                </Card>
                            </>
                        )}
                    </>
                )}
            </AuthorizationManager>
        )
    }
}

export default List
