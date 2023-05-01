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
        const { filters, setFilter, fetch, permissions } = this.props

        return (
            <FiltersContainer>
                <Filter filters={filters} type={'search'} setFilter={setFilter} fetch={fetch} label={'Search'} />
                <Filter
                    filters={filters}
                    type={'text'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'User'}
                    name={'user'}
                    placeholder={'Username'}
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
                    name={'has_permissions'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Permissions'}
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
                    name={'users'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Users'}
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
                            label: 'Users',
                            value: 'users_count',
                        },
                        {
                            label: 'Permissions',
                            value: 'permissions_count',
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
