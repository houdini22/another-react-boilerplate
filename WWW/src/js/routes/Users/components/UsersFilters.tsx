import * as React from 'react'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Filter } from '../../../components/common/List/Filter'

interface FiltersProps {
    filters: Object
    setFilter: Function
    fetch(): Function
}

export class Filters extends React.Component<FiltersProps, null> {
    render() {
        const { filters, setFilter, fetch } = this.props

        return (
            <FiltersContainer>
                <Filter filters={filters} type={'search'} setFilter={setFilter} fetch={fetch} label={'Search'} />
                <Filter
                    filters={filters}
                    options={[
                        {
                            label: 'Has or has not avatar',
                            value: 'has_or_has_not',
                        },
                        {
                            label: 'Has avatar',
                            value: 'has',
                        },
                        {
                            label: 'Has not avatar',
                            value: 'has_not',
                        },
                    ]}
                    type={'radio'}
                    name={'avatar'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Avatar'}
                />
                <Filter
                    filters={filters}
                    options={[
                        {
                            label: 'Active or Not Active',
                            value: 'active_or_not_active',
                        },
                        {
                            label: 'Active',
                            value: 'active',
                        },
                        {
                            label: 'Not Active',
                            value: 'not_active',
                        },
                    ]}
                    type={'radio'}
                    name={'status'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Active'}
                />
                <Filter
                    filters={filters}
                    options={[
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
                    ]}
                    type={'order'}
                    setFilter={setFilter}
                    fetch={fetch}
                />
                <Filter
                    filters={filters}
                    options={[
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
                    ]}
                    type={'radio'}
                    name={'items_per_page'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Items per page'}
                />
            </FiltersContainer>
        )
    }
}

export default Filters
