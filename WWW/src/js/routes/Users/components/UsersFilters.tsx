import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import {
    Permission,
    Role,
    SetFilter,
    Filters,
    SetFilters,
    DeleteSavedFilter,
    SaveFilters,
    RestoreSavedFilter,
    ResetFilters,
} from '../../../../types.d'
import { LoadingOverlay } from '../../../components'

interface FiltersProps {
    filters: Object
    setFilter: SetFilter
    roles: Array<Role>
    permissions: Array<Permission>
    resetFilters: ResetFilters
    defaultFilters: Filters
    isLoading: boolean
    setFilters: SetFilters
    savedFilters: Filters
    deleteSavedFilter: DeleteSavedFilter
    saveFilters: SaveFilters
    restoreSavedFilter: RestoreSavedFilter
}

export class UserFilters extends React.Component<FiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            roles,
            permissions,
            resetFilters,
            defaultFilters,
            isLoading,
            setFilters,
            savedFilters,
            deleteSavedFilter,
            saveFilters,
            restoreSavedFilter,
        } = this.props

        return (
            <FiltersCard
                name={'UsersList'}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                defaultFilters={defaultFilters}
                savedFilters={savedFilters}
                deleteSavedFilter={deleteSavedFilter}
                saveFilters={saveFilters}
                restoreSavedFilter={restoreSavedFilter}
                filtersToRender={[
                    {
                        type: 'search',
                        label: 'Search',
                        name: 'search',
                    },
                    {
                        options: [
                            {
                                label: 'yes or no',
                                value: 'yes_or_no',
                            },
                            {
                                label: 'yes',
                                value: 'yes',
                            },
                            {
                                label: 'no',
                                value: 'no',
                            },
                        ],
                        type: 'radio',
                        name: 'avatar',
                        label: 'Has Avatar',
                    },
                    {
                        options: [
                            {
                                label: 'yes or no',
                                value: 'yes_or_no',
                            },
                            {
                                label: 'yes',
                                value: 'yes',
                            },
                            {
                                label: 'no',
                                value: 'no',
                            },
                        ],
                        type: 'radio',
                        name: 'files',
                        label: 'Has Files',
                    },
                    {
                        options: [
                            {
                                label: 'yes or no',
                                value: 'yes_or_no',
                            },
                            {
                                label: 'yes',
                                value: 'yes',
                            },
                            {
                                label: 'no',
                                value: 'no',
                            },
                        ],
                        type: 'radio',
                        name: 'has_roles',
                        label: 'Has Roles',
                    },
                    {
                        options: [
                            {
                                label: 'yes or no',
                                value: 'yes_or_no',
                            },
                            {
                                label: 'yes',
                                value: 'yes',
                            },
                            {
                                label: 'no',
                                value: 'no',
                            },
                        ],
                        type: 'radio',
                        name: 'has_permissions',
                        label: 'Has Permissions',
                    },
                    {
                        options: [
                            {
                                label: 'both',
                                value: 'yes_or_no',
                            },
                            {
                                label: 'active',
                                value: 'active',
                            },
                            {
                                label: 'not active',
                                value: 'not_active',
                            },
                        ],
                        name: 'status',
                        label: 'Active',
                        type: 'radio',
                    },
                    {
                        options: permissions.map(({ id, name }) => {
                            return {
                                label: name,
                                value: id,
                            }
                        }),
                        name: 'permissions',
                        label: 'Permissions',
                        type: 'multiple',
                    },
                    {
                        options: roles.map(({ id, name }) => {
                            return {
                                label: name,
                                value: id,
                            }
                        }),
                        name: 'roles',
                        label: 'Roles',
                        type: 'multiple',
                    },
                    {
                        type: 'order',
                        options: [
                            {
                                label: 'ID',
                                value: 'id',
                            },
                            {
                                label: 'Name',
                                value: 'name',
                            },
                            {
                                label: 'Email',
                                value: 'email',
                            },
                            {
                                label: 'Files Count',
                                value: 'files_count',
                            },
                        ],
                    },
                    {
                        type: 'radio',
                        name: 'items_per_page',
                        label: 'Items per page',
                        options: [
                            {
                                label: '15',
                                value: 15,
                            },
                            {
                                label: '40',
                                value: 40,
                            },
                            {
                                label: '100',
                                value: 100,
                            },
                        ],
                    },
                ]}
            >
                {isLoading && <LoadingOverlay />}
            </FiltersCard>
        )
    }
}

export default UserFilters
