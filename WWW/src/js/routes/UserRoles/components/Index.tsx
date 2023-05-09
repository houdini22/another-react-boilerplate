import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager, UsersManager, TitleManager, FiltersManager } from '../../../containers'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { getDefaultFilters } from '../../../helpers/roles'
import { createUrlFilters, splitIds } from '../../../helpers/filters'
import List from './List'

export class UsersView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { user = '', permissions: permissionsFromUri = '' } }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users', 'Roles'])

                            return (
                                <UsersManager>
                                    {({ deleteRole, setIsLoading, deletePermission, deleteRolePermission, deleteUserRole, isLoading }) => {
                                        return (
                                            <FiltersManager
                                                name={'roles-list'}
                                                defaultFilters={getDefaultFilters()}
                                                urlFilters={createUrlFilters({
                                                    user,
                                                    permissions: splitIds(permissionsFromUri),
                                                })}
                                            >
                                                {({
                                                    defaultFilters,
                                                    filters,
                                                    setFilters,
                                                    setFilter,
                                                    resetFilters,
                                                    saveFilters,
                                                    deleteSavedFilter,
                                                    savedFilters,
                                                    restoreSavedFilter,
                                                }) => (
                                                    <ListManager
                                                        filtersDataUrl={'/roles/filtersData'}
                                                        url={'/roles/list'}
                                                        filters={filters}
                                                        setIsLoading={setIsLoading}
                                                    >
                                                        {({
                                                            data: {
                                                                roles: {
                                                                    data,
                                                                    links,
                                                                    hasNextPage,
                                                                    hasPrevPage,
                                                                    totalPages,
                                                                    per_page: perPage,
                                                                    total,
                                                                } = {},
                                                            } = {},
                                                            filtersData,
                                                            setPage,
                                                            fetch,
                                                            page,
                                                        }) => {
                                                            return (
                                                                <PageContent>
                                                                    <Header />

                                                                    <List
                                                                        filters={filters}
                                                                        filtersData={filtersData}
                                                                        setFilter={setFilter}
                                                                        resetFilters={resetFilters}
                                                                        defaultFilters={defaultFilters}
                                                                        isLoading={isLoading}
                                                                        setFilters={setFilters}
                                                                        savedFilters={savedFilters}
                                                                        saveFilters={saveFilters}
                                                                        deleteSavedFilter={deleteSavedFilter}
                                                                        restoreSavedFilter={restoreSavedFilter}
                                                                        links={links}
                                                                        page={page}
                                                                        setPage={setPage}
                                                                        hasNextPage={hasNextPage}
                                                                        hasPrevPage={hasPrevPage}
                                                                        totalPages={totalPages}
                                                                        setIsLoading={setIsLoading}
                                                                        deleteUserRole={deleteUserRole}
                                                                        perPage={perPage}
                                                                        total={total}
                                                                        deleteRolePermission={deleteRolePermission}
                                                                        fetch={fetch}
                                                                        deletePermission={deletePermission}
                                                                        deleteRole={deleteRole}
                                                                        data={data}
                                                                    />
                                                                </PageContent>
                                                            )
                                                        }}
                                                    </ListManager>
                                                )}
                                            </FiltersManager>
                                        )
                                    }}
                                </UsersManager>
                            )
                        }}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
