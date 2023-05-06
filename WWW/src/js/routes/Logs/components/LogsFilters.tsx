import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'

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
            logsData,
            isLoading,
            resetFilters,
            defaultFilters,
            setFilters,
            setIsLoading,
        } = this.props
        return (
            <FiltersCard
                name={'UsersLogsList'}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                fetch={() => {
                    setIsLoading(true)
                    fetch().then(() => setIsLoading(false))
                }}
                defaultFilters={defaultFilters}
                isLoading={isLoading}
                filtersToRender={[
                    {
                        type: 'select',
                        options: logsData?.models?.map(({ name }) => {
                            return {
                                label: name,
                                value: name,
                            }
                        }),
                        name: 'model_name',
                        label: 'Model',
                    },
                    {
                        type: 'select',
                        options: [
                            {
                                label: 'None',
                                value: 'none',
                            },
                            ...(logsData?.users?.map(({ id, name }) => {
                                return {
                                    label: name,
                                    value: id,
                                }
                            }) || []),
                        ],
                        name: 'user',
                        label: 'User',
                    },
                    {
                        type: 'select',
                        options: Object.values(logsData?.types || {})?.map((name) => {
                            return {
                                label: name,
                                value: name,
                            }
                        }),
                        name: 'type',
                        label: 'Type',
                    },
                    {
                        type: 'order',
                        options: [
                            {
                                label: 'ID',
                                value: 'id',
                            },
                            {
                                label: 'Type',
                                value: 'type',
                            },
                            {
                                label: 'Date created',
                                value: 'created_at',
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
        )
    }
}

export default Filters
