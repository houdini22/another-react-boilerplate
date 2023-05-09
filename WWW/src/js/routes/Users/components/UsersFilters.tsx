import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { SetFilter, Filters, SetFilters, DeleteSavedFilter, SaveFilters, RestoreSavedFilter, ResetFilters, SavedFilters } from '../../../../types.d'
import { LoadingOverlay } from '../../../components'
import { sortPermissionsByNameAscending } from '../../../helpers/permissions'
import { sortRolesByNameAscending } from '../../../helpers/roles'
import { PermissionIcon, RoleIcon } from '../../../components/icons'

interface FiltersProps {
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
    filtersData: Object
}

export class UserFilters extends React.Component<FiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            resetFilters,
            defaultFilters,
            isLoading,
            setFilters,
            savedFilters,
            deleteSavedFilter,
            saveFilters,
            restoreSavedFilter,
            filtersData,
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
                filtersData={filtersData}
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
                        name: 'has_avatar',
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
                        name: 'has_files',
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
                        name: 'status',
                        label: 'Active',
                        type: 'radio',
                    },
                    {
                        options: sortPermissionsByNameAscending(filtersData?.permissions?.data).map(({ id, name, count }) => {
                            return {
                                label: `${name} (${count})`,
                                value: id,
                                icon: <PermissionIcon />,
                            }
                        }),
                        name: 'permissions',
                        label: 'Permissions',
                        type: 'multiple',
                    },
                    {
                        options: sortRolesByNameAscending(filtersData?.roles?.data).map(({ id, name, count }) => {
                            return {
                                label: `${name} (${count})`,
                                value: id,
                                icon: <RoleIcon />,
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
