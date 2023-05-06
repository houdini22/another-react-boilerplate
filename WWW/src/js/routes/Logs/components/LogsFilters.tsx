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
                        options: [
                            ...(logsData?.models?.map(({ count, model_class_name }) => {
                                if (model_class_name === null) {
                                    return {
                                        value: 'none',
                                        label: `NONE (${count})`,
                                    }
                                } else {
                                    return {
                                        value: model_class_name,
                                        label: `${model_class_name} (${count})`,
                                    }
                                }
                            }) || []),
                            /*{
                                label: 'None',
                                value: 'none',
                            },
                            ...Object.keys(logsData?.models || {})
                                ?.map((key) => {
                                    return {
                                        name: key,
                                        items: logsData?.models[key],
                                    }
                                })
                                ?.map(({ name, items }) => {
                                    return {
                                        label: `${name} (${items.length})`,
                                        value: name,
                                    }
                                }),*/
                        ],
                        name: 'model_name',
                        label: 'Model',
                    },
                    {
                        type: 'select',
                        options: [
                            ...(logsData?.users
                                ?.map(({ count, user, user_id }) => {
                                    if (user === null && user_id === 0) {
                                        return {
                                            value: 'none',
                                            label: `NONE (${count})`,
                                        }
                                    } else if (user === null) {
                                        return {
                                            value: user_id,
                                            label: `_USER ID: ${user_id} (${count})`,
                                        }
                                    }
                                    return {
                                        value: user_id,
                                        label: `${user.name} (${count})`,
                                    }
                                })
                                .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB)) || []),
                            /*{
                                label: 'None',
                                value: 'none',
                            },
                            ...Object.keys(logsData?.users || {})
                                ?.map((key) => {
                                    return {
                                        name: key,
                                        items: logsData?.users[key],
                                    }
                                })
                                ?.map(({ name, items }) => {
                                    return {
                                        label: `${name} (${items.length})`,
                                        value: name,
                                    }
                                }),*/
                        ],
                        name: 'user',
                        label: 'User',
                    },
                    {
                        type: 'select',
                        options: logsData?.types?.map(({ count, type }) => {
                            return {
                                value: type,
                                label: `${type} (${count})`,
                            }
                        }) /*Object.keys(logsData?.types || {})
                            ?.map((key) => {
                                return {
                                    type: key,
                                    items: logsData?.types[key],
                                }
                            })
                            ?.map(({ type, items }) => {
                                return {
                                    label: `${type} (${items.length})`,
                                    value: type,
                                }
                            })*/,
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
