import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { DeleteSavedFilter, Filters, ResetFilters, RestoreSavedFilter, SavedFilters, SaveFilters, SetFilter, SetFilters } from '../../../../types.d'
import { LoadingOverlay } from '../../../components'

interface LogsFiltersProps {
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

export class LogsFilters extends React.Component<LogsFiltersProps, null> {
    render() {
        const {
            filters,
            setFilter,
            filtersData,
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
                name={'UserLogsList'}
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
                        type: 'select',
                        options: [
                            ...(filtersData?.model?.data?.map(({ count, model_class_name }) => {
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
                        ],
                        name: 'model',
                        label: 'Model',
                    },
                    {
                        type: 'select',
                        options: [
                            ...(filtersData?.user?.data
                                ?.map(({ count, name, user_id }) => {
                                    if (!name && user_id === 0) {
                                        return {
                                            value: 'none',
                                            label: `GUEST (${count})`,
                                        }
                                    } else if (!name) {
                                        return {
                                            value: user_id,
                                            label: `_USER ID: ${user_id} (${count})`,
                                        }
                                    }
                                    return {
                                        value: user_id,
                                        label: `${name} (${count})`,
                                    }
                                })
                                .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB)) || []),
                        ],
                        name: 'user',
                        label: 'User',
                    },
                    {
                        type: 'select',
                        options: filtersData?.type?.data?.map(({ count, type }) => {
                            return {
                                value: type,
                                label: `${type} (${count})`,
                            }
                        }),
                        name: 'type',
                        label: 'Type',
                    },
                    {
                        type: 'select',
                        options: [
                            ...(filtersData?.related_model?.data?.map(({ count, related_model_class_name, related_model_id }) => {
                                if (related_model_class_name === null) {
                                    return {
                                        value: 'none',
                                        label: `NONE (${count})`,
                                    }
                                } else {
                                    return {
                                        value: related_model_class_name,
                                        label: `${related_model_class_name} ID:${related_model_id} (${count})`,
                                    }
                                }
                            }) || []),
                        ],
                        name: 'related_model',
                        label: 'Related Model',
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

export default LogsFilters
