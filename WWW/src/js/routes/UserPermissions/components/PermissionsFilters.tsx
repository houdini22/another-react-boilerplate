import * as React from 'react'
import { Filters as FiltersContainer } from '../../../components/common/List/Filters'
import { Filter } from '../../../components/common/List/Filter'
import {Button, LoadingOverlay, Card} from "../../../components";
import {ifDeepDiff} from "../../../utils/javascript";

interface FiltersProps {
    filters: Object
    setFilter: Function
    fetch(): Function
}

export class Filters extends React.Component<FiltersProps, null> {
    render() {
        const { filters, setFilter, fetch, roles, isLoading, resetFilters, defaultFilters, restoreFilters, saveFilters } = this.props

        return (
            <Card
                name={'UserPermissionsList'}
                header={<h1>Filters</h1>}
                withMinimizeIcon
                headerActions={[
                    <Button
                        color={'secondary'}
                        onClick={() => resetFilters()}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Reset Filters
                    </Button>,
                    <Button
                        color={'success'}
                        onClick={() => restoreFilters('permissions')}
                    >
                        Restore Filters
                    </Button>,
                    <Button
                        color={'warning'}
                        onClick={() => saveFilters('permissions')}
                        disabled={!ifDeepDiff(defaultFilters, filters)}
                    >
                        Save Filters
                    </Button>,
                ]}
            >
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
                    name={'has_roles'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Roles'}
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
                    name={'has_users'}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={'Has Users'}
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
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Filters
