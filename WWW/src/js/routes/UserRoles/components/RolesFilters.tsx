import * as React from 'react'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Filter } from '../../../components/common/List/Filter'
import {FiltersFactory} from "../../../components/common/List/FiltersFactory";

interface FiltersProps {
    filters: Object
    setFilter: Function
    fetch(): Function
}

export class Filters extends React.Component<FiltersProps, null> {
    render() {
        const { filters, setFilter, fetch, permissions, defaultFilters } = this.props

        return (
                <FiltersFactory
                    filters={filters}
                    setFilter={setFilter}
                    defaultFilters={defaultFilters}
                    fetch={fetch}
                    body={[
                        {
                            type: 'search',
                            label: 'Search',
                            name: 'search'
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
                            label: 'Has Permissions'
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
                            type: 'multiple'
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
                            ]
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
                            ]
                        }
                    ]}
                />
        )
    }
}

export default Filters
