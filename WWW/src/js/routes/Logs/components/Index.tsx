import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { TitleManager } from '../../../containers/TitleManager'
import { getDefaultFilters } from '../../../helpers/logs'
import List from './List'
import { FiltersManager } from '../../../containers/FiltersManager'
import { LogsManager } from '../../../containers/LogsManager'
import { LogsFilters } from './LogsFilters'

export class LogsView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users', 'Logs'])
                            return (
                                <LogsManager>
                                    {({ isLoading, setIsLoading }) => (
                                        <FiltersManager name={'logs-list'} defaultFilters={getDefaultFilters()}>
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
                                                <ListManager url={'/logs/list'} filters={filters} setIsLoading={setIsLoading} isLoading={isLoading}>
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
                                                        filtersData,
                                                    }) => {
                                                        return (
                                                            <PageContent>
                                                                <Header />

                                                                <LogsFilters
                                                                    filters={filters}
                                                                    setFilter={setFilter}
                                                                    filtersData={filtersData}
                                                                    defaultFilters={defaultFilters}
                                                                    isLoading={isLoading}
                                                                    resetFilters={resetFilters}
                                                                    setFilters={setFilters}
                                                                    savedFilters={savedFilters}
                                                                    saveFilters={saveFilters}
                                                                    deleteSavedFilter={deleteSavedFilter}
                                                                    restoreSavedFilter={restoreSavedFilter}
                                                                />

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
                                                                    links={links}
                                                                    page={page}
                                                                    setPage={setPage}
                                                                    hasNextPage={hasNextPage}
                                                                    hasPrevPage={hasPrevPage}
                                                                    totalPages={totalPages}
                                                                    data={data}
                                                                    setIsLoading={setIsLoading}
                                                                    perPage={perPage}
                                                                    total={total}
                                                                />
                                                            </PageContent>
                                                        )
                                                    }}
                                                </ListManager>
                                            )}
                                        </FiltersManager>
                                    )}
                                </LogsManager>
                            )
                        }}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default LogsView
