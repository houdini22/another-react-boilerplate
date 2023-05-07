import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { LoadingOverlay } from '../../../components'
import {
    DeleteSavedFilter,
    Filters,
    Permission,
    ResetFilters,
    RestoreSavedFilter,
    Role,
    SavedFilters,
    SaveFilters,
    SetFilter,
    SetFilters,
} from '../../../../types.d'

interface RolesFiltersProps {
    filters: Object
    setFilter: SetFilter
    permissions: Array<Permission>
    resetFilters: ResetFilters
    defaultFilters: Filters
    isLoading: boolean
    setFilters: SetFilters
    savedFilters: SavedFilters
    deleteSavedFilter: DeleteSavedFilter
    saveFilters: SaveFilters
    restoreSavedFilter: RestoreSavedFilter
}

export class RolesFilters extends React.Component<RolesFiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            permissions,
            defaultFilters,
            isLoading,
            resetFilters,
            setFilters,
            savedFilters,
            saveFilters,
            deleteSavedFilter,
            restoreSavedFilter,
        } = this.props

        return (
            <FiltersCard
                name={'UserRolesList'}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                defaultFilters={defaultFilters}
                isLoading={isLoading}
                savedFilters={savedFilters}
                saveFilters={saveFilters}
                deleteSavedFilter={deleteSavedFilter}
                restoreSavedFilter={restoreSavedFilter}
                filtersToRender={[
                    {
                        type: 'search',
                        label: 'Search',
                        name: 'search',
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        name: 'user',
                        placeholder: 'Username',
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
                        name: 'users',
                        label: 'Has Users',
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
                                label: 'Users',
                                value: 'users_count',
                            },
                            {
                                label: 'Permissions',
                                value: 'permissions_count',
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
                                label: '50',
                                value: 50,
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

export default RolesFilters
