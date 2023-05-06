import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, LoadingOverlay, Modal } from '../../../components'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { ListManager } from '../../../components/common/List/ListManager'
import LogsTable from './LogsTable'
import { Pagination } from '../../../components/common/List/Pagination'
import Header from './Header'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import LogsFilters from './LogsFilters'

export class LogsView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { user = '', roles: rolesFromUri } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <AuthorizationManager>
                                {({ canByPermission }) => (
                                    <Modal.Manager>
                                        {({ registerModal, closeModal, openModal }) => (
                                            <TitleManager>
                                                {({ setTitleSegments }) => {
                                                    setTitleSegments(['Users', 'Logs'])
                                                    return (
                                                        <ListManager
                                                            url={'/logs/list'}
                                                            defaultFilters={{
                                                                user: '',
                                                                items_per_page: 20,
                                                                order_by: 'id',
                                                                order_direction: 'desc',
                                                                model_name: '',
                                                                type: '',
                                                                related_modal_name: '',
                                                            }}
                                                            urlFilters={{
                                                                user,
                                                            }}
                                                        >
                                                            {({
                                                                data,
                                                                isLoading: isLoading2,
                                                                fetch,
                                                                links,
                                                                page,
                                                                setPage,
                                                                hasNextPage,
                                                                hasPrevPage,
                                                                totalPages,
                                                                filters,
                                                                setFilter,
                                                                perPage,
                                                                total,
                                                                resetFilters,
                                                                restoreFilters,
                                                                defaultFilters,
                                                                setFilters,
                                                            }) => {
                                                                return (
                                                                    <UsersManager getLogsData logsDataFilters={filters}>
                                                                        {({ setIsLoading, isLoading, logsData }) => {
                                                                            return (
                                                                                <PageContent>
                                                                                    <Header
                                                                                        navigate={navigate}
                                                                                        canByPermission={
                                                                                            canByPermission
                                                                                        }
                                                                                    />

                                                                                    {canByPermission('logs.list') && (
                                                                                        <>
                                                                                            <LogsFilters
                                                                                                filters={filters}
                                                                                                setFilter={setFilter}
                                                                                                fetch={fetch}
                                                                                                resetFilters={
                                                                                                    resetFilters
                                                                                                }
                                                                                                restoreFilters={
                                                                                                    restoreFilters
                                                                                                }
                                                                                                defaultFilters={
                                                                                                    defaultFilters
                                                                                                }
                                                                                                setFilters={setFilters}
                                                                                                isLoading={
                                                                                                    isLoading ||
                                                                                                    isLoading2
                                                                                                }
                                                                                                setIsLoading={
                                                                                                    setIsLoading
                                                                                                }
                                                                                                logsData={logsData}
                                                                                            />

                                                                                            <Card>
                                                                                                <Pagination
                                                                                                    links={links}
                                                                                                    page={page}
                                                                                                    fetch={fetch}
                                                                                                    setPage={setPage}
                                                                                                    hasNextPage={
                                                                                                        hasNextPage
                                                                                                    }
                                                                                                    hasPrevPage={
                                                                                                        hasPrevPage
                                                                                                    }
                                                                                                    totalPages={
                                                                                                        totalPages
                                                                                                    }
                                                                                                />
                                                                                                <LogsTable
                                                                                                    setIsLoading={
                                                                                                        setIsLoading
                                                                                                    }
                                                                                                    data={data}
                                                                                                    fetch={fetch}
                                                                                                    addToastNotification={
                                                                                                        addToastNotification
                                                                                                    }
                                                                                                    page={page}
                                                                                                    perPage={perPage}
                                                                                                    total={total}
                                                                                                    totalPages={
                                                                                                        totalPages
                                                                                                    }
                                                                                                    navigate={navigate}
                                                                                                    openModal={
                                                                                                        openModal
                                                                                                    }
                                                                                                    registerModal={
                                                                                                        registerModal
                                                                                                    }
                                                                                                    closeModal={
                                                                                                        closeModal
                                                                                                    }
                                                                                                    canByPermission={
                                                                                                        canByPermission
                                                                                                    }
                                                                                                />
                                                                                                <Pagination
                                                                                                    links={links}
                                                                                                    page={page}
                                                                                                    fetch={fetch}
                                                                                                    setPage={setPage}
                                                                                                    hasNextPage={
                                                                                                        hasNextPage
                                                                                                    }
                                                                                                    hasPrevPage={
                                                                                                        hasPrevPage
                                                                                                    }
                                                                                                    totalPages={
                                                                                                        totalPages
                                                                                                    }
                                                                                                />
                                                                                                {(isLoading ||
                                                                                                    isLoading2) && (
                                                                                                    <LoadingOverlay />
                                                                                                )}
                                                                                            </Card>
                                                                                        </>
                                                                                    )}
                                                                                </PageContent>
                                                                            )
                                                                        }}
                                                                    </UsersManager>
                                                                )
                                                            }}
                                                        </ListManager>
                                                    )
                                                }}
                                            </TitleManager>
                                        )}
                                    </Modal.Manager>
                                )}
                            </AuthorizationManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default LogsView
