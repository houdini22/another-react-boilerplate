import * as React from 'react'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { LoadingOverlay } from '../../../components'

export class FilesFiles extends React.Component<null, null> {
    render() {
        const {
            filters,
            setFilter,
            fetch,
            resetFilters,
            defaultFilters,
            setFilters,
            isLoading,
            savedFilters,
            deleteSavedFilter,
            restoreSavedFilter,
            saveFilters,
            filtersData,
        } = this.props

        return (
            <FiltersCard
                name={'MediaList'}
                filtersData={filtersData}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                fetch={fetch}
                defaultFilters={defaultFilters}
                isLoading={isLoading}
                savedFilters={savedFilters}
                deleteSavedFilter={deleteSavedFilter}
                restoreSavedFilter={restoreSavedFilter}
                saveFilters={saveFilters}
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
                        name: 'has_user',
                        label: 'Has User',
                    },
                    {
                        options: [
                            {
                                label: 'ID',
                                value: 'id',
                            },
                            {
                                label: 'File Size',
                                value: 'size',
                            },
                            {
                                label: 'Width',
                                value: 'width',
                            },
                            {
                                label: 'Height',
                                value: 'height',
                            },
                            {
                                label: 'Previews',
                                value: 'preview_count',
                            },
                            {
                                label: 'Downloads',
                                value: 'download_count',
                            },
                        ],
                        type: 'order',
                    },
                    {
                        options: [
                            {
                                label: '24',
                                value: 24,
                            },
                            {
                                label: '48',
                                value: 48,
                            },
                            {
                                label: '96',
                                value: 96,
                            },
                        ],
                        type: 'radio',
                        name: 'items_per_page',
                        label: 'Items per page',
                    },
                ]}
            >
                {isLoading && <LoadingOverlay />}
            </FiltersCard>
        )
    }
}

export default FilesFiles
