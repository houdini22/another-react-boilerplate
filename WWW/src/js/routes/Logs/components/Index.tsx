import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager, TitleManager, FiltersManager, LogsManager } from '../../../containers'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { getDefaultFilters } from '../../../helpers/logs'
import List from './List'
import { LogsFilters } from './LogsFilters'

export class LogsView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {() => (
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
                                                <ListManager
                                                    url={'/logs/list'}
                                                    filtersDataUrl={'/logs/filtersData'}
                                                    filters={filters}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                >
                                                    {({
                                                        data: {
                                                            logs: {
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
                                                        page,
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
                                                                    isLoading={isLoading}
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
