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
        const { filters, setFilter, fetch, roles, permissions } = this.props

        return (
            <FiltersContainer>
                <Filter filters={filters} type={'search'} setFilter={setFilter} fetch={fetch} label={'Search'} />
                <Filter
                    filters={filters}
                    options={[
                        {
                            label: 'yes or no',
                            value: 'yes_or_no',
                        },
                        {
                            label: 'yes',
                            value: 'has',
                        },
                        {
                            label: 'no',
                            value: 'has_not',
                        },
                    ]}
                    type={'radio'}
                    name={'avatar'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Avatar'}
                />
                <Filter
                    filters={filters}
                    options={[
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
                    ]}
                    type={'radio'}
                    name={'files'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Files'}
                />
                <Filter
                    filters={filters}
                    options={[
                        {
                            label: 'both',
                            value: 'yes_or_no',
                        },
                        {
                            label: 'active',
                            value: 'active',
                        },
                        {
                            label: 'not active',
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
                    type={'multiple'}
                    name={'roles'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Roles'}
                    options={roles.map(({ id, name }) => {
                        return {
                            label: name,
                            value: id,
                        }
                    })}
                />
                <Filter
                    filters={filters}
                    type={'multiple'}
                    name={'permissions'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Permissions'}
                    options={permissions.map(({ id, name }) => {
                        return {
                            label: name,
                            value: id,
                        }
                    })}
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
                        {
                            label: 'Files Count',
                            value: 'files_count',
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
