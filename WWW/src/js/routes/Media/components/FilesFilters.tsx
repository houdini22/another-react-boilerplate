import * as React from 'react'
import styles from '../../../../assets/scss/components/_file.scss'
import classNames from 'classnames/bind'
import { FiltersCard } from '../../../components/common/FiltersCard'

const cx = classNames.bind(styles)

export class FilesFiles extends React.Component<null, null> {
    render() {
        const { filters, setFilter, fetch, resetFilters, defaultFilters, setFilters, isLoading } = this.props

        return (
            <FiltersCard
                name={'MediaList'}
                filters={filters}
                setFilter={setFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                fetch={fetch}
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
                        placeholder: 'username',
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
            />
        )
    }
}

export default FilesFiles
