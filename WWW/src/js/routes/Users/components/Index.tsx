import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager, UsersManager, TitleManager, FiltersManager } from '../../../containers'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { getDefaultFilters } from '../../../helpers/users'
import { createUrlFilters, splitIds } from '../../../helpers/filters'
import List from './List'

export class UsersView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { roles: rolesFromUri = '', permissions: permissionsFromUri = '' } }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users'])

                            return (
                                <UsersManager>
                                    {({
                                        deleteUserPermission,
                                        deleteUser,
                                        deleteUserRole,
                                        activateUser,
                                        deactivateUser,
                                        isLoading,
                                        deleteAvatar,
                                        setIsLoading,
                                    }) => (
                                        <FiltersManager
                                            name={'users-list'}
                                            defaultFilters={getDefaultFilters()}
                                            urlFilters={createUrlFilters({
                                                roles: splitIds(rolesFromUri),
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
                                                    filtersDataUrl={'/users/filtersData'}
                                                    url={'/users/list'}
                                                    filters={filters}
                                                    setIsLoading={setIsLoading}
                                                >
                                                    {({
                                                        data: {
                                                            users: {
                                                                data,
                                                                links,
                                                                hasNextPage,
                                                                hasPrevPage,
                                                                totalPages,
                                                                per_page: perPage,
                                                                total,
                                                            } = {},
                                                        },
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
                                                                    setFilter={setFilter}
                                                                    resetFilters={resetFilters}
                                                                    defaultFilters={defaultFilters}
                                                                    isLoading={isLoading}
                                                                    setFilters={setFilters}
                                                                    savedFilters={savedFilters}
                                                                    saveFilters={saveFilters}
                                                                    deleteSavedFilter={deleteSavedFilter}
                                                                    restoreSavedFilter={restoreSavedFilter}
                                                                    data={data}
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
                                                                    links={links}
                                                                    setPage={setPage}
                                                                    hasNextPage={hasNextPage}
                                                                    hasPrevPage={hasPrevPage}
                                                                    filtersData={filtersData}
                                                                />
                                                            </PageContent>
                                                        )
                                                    }}
                                                </ListManager>
                                            )}
                                        </FiltersManager>
                                    )}
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
