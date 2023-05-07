import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'
import { getDefaultFilters } from '../../../helpers/roles'
import { splitIds } from '../../../helpers/filters'
import { FiltersManager } from '../../../containers/FiltersManager'
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
                                <UsersManager getPermissions>
                                    {({
                                        deleteRole,
                                        setIsLoading,
                                        deletePermission,
                                        deleteRolePermission,
                                        deleteUserRole,
                                        permissions,
                                        isLoading,
                                    }) => {
                                        return (
                                            <FiltersManager
                                                name={'roles-list'}
                                                defaultFilters={getDefaultFilters()}
                                                urlFilters={{
                                                    user,
                                                    permissions: splitIds(permissionsFromUri),
                                                }}
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
                                                        url={'/roles/list'}
                                                        filters={filters}
                                                        setIsLoading={setIsLoading}
                                                    >
                                                        {({
                                                            data,
                                                            links,
                                                            page,
                                                            setPage,
                                                            hasNextPage,
                                                            hasPrevPage,
                                                            totalPages,
                                                            perPage,
                                                            total,
                                                            fetch,
                                                        }) => {
                                                            return (
                                                                <PageContent>
                                                                    <Header />

                                                                    <List
                                                                        filters={filters}
                                                                        setFilter={setFilter}
                                                                        permissions={permissions}
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
