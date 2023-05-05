import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, LoadingOverlay, Modal } from '../../../components'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { ListManager } from '../../../components/common/List/ListManager'
import RolesTable from './RolesTable'
import { Pagination } from '../../../components/common/List/Pagination'
import RolesFilters from './RolesFilters'
import Header from './Header'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

export class UsersView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { user = '', permissions: permissionsFromUri = '' } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <AuthorizationManager>
                                {({ canByPermission }) => (
                                    <Modal.Manager>
                                        {({ openModal, registerModal, closeModal }) => (
                                            <TitleManager>
                                                {({ setTitleSegments }) => {
                                                    setTitleSegments(['Users', 'Roles'])

                                                    return (
                                                        <UsersManager getPermissions getRoles>
                                                            {({
                                                                deleteRole,
                                                                setIsLoading,
                                                                deletePermission,
                                                                deleteRolePermission,
                                                                deleteUserRole,
                                                                permissions,
                                                                roles,
                                                                isLoading,
                                                            }) => {
                                                                const defaultFilters = {
                                                                    items_per_page: 15,
                                                                    order_by: 'id',
                                                                    order_direction: 'asc',
                                                                    permissions: [],
                                                                    has_permissions: 'yes_or_no',
                                                                    users: 'yes_or_no',
                                                                    user: '',
                                                                    roles: [],
                                                                    search: '',
                                                                }

                                                                return (
                                                                    <ListManager
                                                                        url={'/roles/list'}
                                                                        defaultFilters={defaultFilters}
                                                                        urlFilters={{
                                                                            user,
                                                                            permissions: permissionsFromUri
                                                                                ? permissionsFromUri
                                                                                      .split(',')
                                                                                      .map((n) => Number(n))
                                                                                : [],
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
                                                                            setFilters,
                                                                        }) => {
                                                                            return (
                                                                                <PageContent>
                                                                                    <Header
                                                                                        navigate={navigate}
                                                                                        canByPermission={
                                                                                            canByPermission
                                                                                        }
                                                                                    />

                                                                                    {canByPermission('roles.list') && (
                                                                                        <>
                                                                                            <RolesFilters
                                                                                                filters={filters}
                                                                                                setFilter={setFilter}
                                                                                                fetch={fetch}
                                                                                                permissions={
                                                                                                    permissions
                                                                                                }
                                                                                                roles={roles}
                                                                                                defaultFilters={
                                                                                                    defaultFilters
                                                                                                }
                                                                                                isLoading={
                                                                                                    isLoading ||
                                                                                                    isLoading2
                                                                                                }
                                                                                                resetFilters={
                                                                                                    resetFilters
                                                                                                }
                                                                                                setFilters={setFilters}
                                                                                                setIsLoading={
                                                                                                    setIsLoading
                                                                                                }
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
                                                                                                <RolesTable
                                                                                                    setIsLoading={
                                                                                                        setIsLoading
                                                                                                    }
                                                                                                    roles={data}
                                                                                                    deleteRolePermission={
                                                                                                        deleteRolePermission
                                                                                                    }
                                                                                                    deleteUserRole={
                                                                                                        deleteUserRole
                                                                                                    }
                                                                                                    fetch={fetch}
                                                                                                    addToastNotification={
                                                                                                        addToastNotification
                                                                                                    }
                                                                                                    deletePermission={
                                                                                                        deletePermission
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
                                                                                                    deleteRole={
                                                                                                        deleteRole
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
                                                                    </ListManager>
                                                                )
                                                            }}
                                                        </UsersManager>
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

export default UsersView
