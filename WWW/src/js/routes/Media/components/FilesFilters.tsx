import * as React from 'react'
import styles from '../../../../assets/scss/components/_file.scss'
import classNames from 'classnames/bind'
import { Filter } from '../../../components/common/List/Filter'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Button, Card } from '../../../components'
import { ifDeepDiff } from '../../../utils/javascript'

const cx = classNames.bind(styles)

export class FilesFiles extends React.Component<null, null> {
    render() {
        const { filters, setFilter, fetch, resetFilters, defaultFilters } = this.props

        return (
            <Card
                header={<h1>Filters</h1>}
                headerActions={[
                    <Button
                        color={'secondary'}
                        onClick={() => resetFilters()}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Reset Filters
                    </Button>,
                ]}
            >
                <FiltersContainer>
                    <Filter filters={filters} type={'search'} setFilter={setFilter} fetch={fetch} label={'Search'} />
                    <Filter
                        filters={filters}
                        options={[
                            {
                                label: 'ID',
                                value: 'id',
                            },
                            {
                                label: 'File Size',
                                value: 'size',
                            },
                            {
                                label: 'Height',
                                value: 'height',
                            },
                            {
                                label: 'Width',
                                value: 'width',
                            },
                        ]}
                        type={'order'}
                        setFilter={setFilter}
                        fetch={fetch}
                    />
                    <Filter
                        filters={filters}
                        options={[
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
                        ]}
                        type={'radio'}
                        name={'items_per_page'}
                        setFilter={setFilter}
                        fetch={fetch}
                        label={'Items per page'}
                    />
                </FiltersContainer>
            </Card>
        )
    }
}

export default FilesFiles
