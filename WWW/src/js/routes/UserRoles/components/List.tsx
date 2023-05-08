import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { Pagination } from '../../../components/common/List/Pagination'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import {
    DeletePermission,
    DeleteRole,
    DeleteRolePermission,
    DeleteSavedFilter,
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
} from '../../../../types.d'
import RolesFilters from './RolesFilters'
import RolesTable from './RolesTable'

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
    data: Array<Role>
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    perPage: number
    total: number
    deleteRolePermission: DeleteRolePermission
    fetch: () => Promise<void>
    deletePermission: DeletePermission
    deleteRole: DeleteRole
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
            setIsLoading,
            deleteUserRole,
            perPage,
            total,
            deleteRole,
            fetch,
            deleteRolePermission,
            deletePermission,
            data,
            filtersData,
        } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <>
                        {canByPermission('roles.list') && (
                            <>
                                <RolesFilters
                                    filtersData={filtersData}
                                    filters={filters}
                                    setFilter={setFilter}
                                    fetch={fetch}
                                    defaultFilters={defaultFilters}
                                    isLoading={isLoading}
                                    resetFilters={resetFilters}
                                    setFilters={setFilters}
                                    setIsLoading={setIsLoading}
                                    savedFilters={savedFilters}
                                    saveFilters={saveFilters}
                                    deleteSavedFilter={deleteSavedFilter}
                                    restoreSavedFilter={restoreSavedFilter}
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
                                    <RolesTable
                                        setIsLoading={setIsLoading}
                                        roles={data}
                                        deleteRolePermission={deleteRolePermission}
                                        deleteUserRole={deleteUserRole}
                                        fetch={fetch}
                                        deletePermission={deletePermission}
                                        page={page}
                                        perPage={perPage}
                                        total={total}
                                        totalPages={totalPages}
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
                            </>
                        )}
                    </>
                )}
            </AuthorizationManager>
        )
    }
}

export default List
