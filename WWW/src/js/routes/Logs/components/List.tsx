import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { Pagination } from '../../../components/common/List/Pagination'
import LogsTable from './LogsTable'
import { Log, PaginationLinks, SetIsLoading, SetPage } from '../../../../types.d'
import { AuthorizationManager } from '../../../containers'

interface ListProps {
    isLoading: boolean
    links: PaginationLinks
    page: number
    setPage: SetPage
    hasNextPage: boolean
    hasPrevPage: boolean
    totalPages: number
    data: Array<Log>
    setIsLoading: SetIsLoading
    perPage: number
    total: number
}

export class List extends React.Component<ListProps, null> {
    render() {
        const { isLoading, links, page, setPage, hasNextPage, hasPrevPage, totalPages, data, perPage, total } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <>
                        {canByPermission('logs.list') && (
                            <Card>
                                <Pagination
                                    links={links}
                                    page={page}
                                    setPage={setPage}
                                    hasNextPage={hasNextPage}
                                    hasPrevPage={hasPrevPage}
                                    totalPages={totalPages}
                                />
                                <LogsTable data={data} page={page} perPage={perPage} total={total} totalPages={totalPages} />
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
                        )}
                    </>
                )}
            </AuthorizationManager>
        )
    }
}

export default List
