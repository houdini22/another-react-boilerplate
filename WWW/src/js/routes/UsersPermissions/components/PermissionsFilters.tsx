import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { DeleteSavedFilter, Filters, ResetFilters, RestoreSavedFilter, SavedFilters, SaveFilters, SetFilter, SetFilters } from '../../../../types.d'
import { Badge, LoadingOverlay } from '../../../components'
import { sortRolesByNameAscending } from '../../../helpers/roles'
import { PermissionIcon } from '../../../components/icons'

interface RolesFiltersProps {
    filters: Object
    setFilter: SetFilter
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
            defaultFilters,
            isLoading,
            resetFilters,
            setFilters,
            savedFilters,
            saveFilters,
            deleteSavedFilter,
            restoreSavedFilter,
            filtersData,
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
                filtersData={filtersData}
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
                        options: sortRolesByNameAscending(filtersData?.roles?.data).map(({ id, name, count }) => {
                            return {
                                label: (
                                    <>
                                        {name}{' '}
                                        <Badge color={'info'} rounded size={'xs'}>
                                            {count}
                                        </Badge>
                                    </>
                                ),
                                value: id,
                                icon: <PermissionIcon />,
                                disabled: count === 0,
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

export default PermissionsFilters
