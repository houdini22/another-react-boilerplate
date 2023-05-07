import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import {
    DeleteSavedFilter,
    Filters,
    ResetFilters,
    RestoreSavedFilter,
    Role,
    SavedFilters,
    SaveFilters,
    SetFilter,
    SetFilters,
} from '../../../../types.d'
import { LoadingOverlay } from '../../../components'

interface RolesFiltersProps {
    filters: Object
    setFilter: SetFilter
    roles: Array<Role>
    resetFilters: ResetFilters
    defaultFilters: Filters
    isLoading: boolean
    setFilters: SetFilters
    savedFilters: SavedFilters
    deleteSavedFilter: DeleteSavedFilter
    saveFilters: SaveFilters
    restoreSavedFilter: RestoreSavedFilter
}

export class PermissionsFilters extends React.Component<RolesFiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            roles,
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
                name={'UserPermissionsList'}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                savedFilters={savedFilters}
                saveFilters={saveFilters}
                deleteSavedFilter={deleteSavedFilter}
                restoreSavedFilter={restoreSavedFilter}
                defaultFilters={defaultFilters}
                isLoading={isLoading}
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
                        name: 'has_users',
                        label: 'Has Users',
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

export default PermissionsFilters
