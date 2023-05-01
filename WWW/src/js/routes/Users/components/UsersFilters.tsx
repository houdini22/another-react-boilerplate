import * as React from 'react'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Filter } from '../../../components/common/List/Filter'
import { Button, LoadingOverlay, Card } from '../../../components'
import { ifDeepDiff } from '../../../utils/javascript'
import { FiltersFactory } from '../../../components/common/List/FiltersFactory'

interface FiltersProps {
    filters: Object
    setFilter: Function
    fetch(): Function
}

export class Filters extends React.Component<FiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            fetch,
            roles,
            permissions,
            resetFilters,
            defaultFilters,
            restoreFilters,
            saveFilters,
            isLoading,
        } = this.props

        return (
            <Card
                name={'UsersList'}
                header={<h1>Filters</h1>}
                withMinimizeIcon
                headerActions={[
                    <Button
                        color={'secondary'}
                        onClick={() => resetFilters()}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Reset Filters
                    </Button>,
                    <Button color={'success'} onClick={() => restoreFilters('users')}>
                        Restore Filters
                    </Button>,
                    <Button
                        color={'warning'}
                        onClick={() => saveFilters('users')}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Save Filters
                    </Button>,
                ]}
            >
                <FiltersFactory
                    filters={filters}
                    setFilter={setFilter}
                    defaultFilters={defaultFilters}
                    fetch={fetch}
                    body={[
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
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Filters
