import * as React from 'react'
import styles from '../../../../assets/scss/components/_file.scss'
import classNames from 'classnames/bind'
import { Filter } from '../../../components/common/List/Filter'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Button, Card } from '../../../components'
import { ifDeepDiff } from '../../../utils/javascript'
import { FiltersFactory } from '../../../components/common/List/FiltersFactory'

const cx = classNames.bind(styles)

export class FilesFiles extends React.Component<null, null> {
    render() {
        const { filters, setFilter, fetch, resetFilters, defaultFilters, restoreFilters, saveFilters } = this.props

        return (
            <Card
                name={'MediaList'}
                withMinimizeIcon
                header={<h1>Filters</h1>}
                headerActions={[
                    <Button
                        color={'secondary'}
                        onClick={() => resetFilters()}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Reset Filters
                    </Button>,
                    <Button color={'success'} onClick={() => restoreFilters('media')}>
                        Restore Filters
                    </Button>,
                    <Button
                        color={'warning'}
                        onClick={() => saveFilters('media')}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Save Filters
                    </Button>,
                ]}
            >
                <FiltersFactory
                    filters={filters}
                    setFilter={setFilter}
                    fetch={fetch}
                    body={[
                        {
                            type: 'search',
                            label: 'Search',
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
            </Card>
        )
    }
}

export default FilesFiles
