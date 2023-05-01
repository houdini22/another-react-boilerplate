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
            isLoading,
            resetFilters,
            defaultFilters,
            restoreFilters,
            saveFilters,
        } = this.props

        return (
            <Card
                name={'UserPermissionsList'}
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
                    <Button color={'success'} onClick={() => restoreFilters('permissions')}>
                        Restore Filters
                    </Button>,
                    <Button
                        color={'warning'}
                        onClick={() => saveFilters('permissions')}
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
