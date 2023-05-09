import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Filter } from './Filter'
import { Filters, SetFilter } from '../../../../types.d'

const cx = classNames.bind(styles)

interface FiltersFactoryProps {
    children?: any
    filters: Filters
    setFilter: SetFilter
    filtersData: Object
}

class FiltersFactory extends React.Component<FiltersFactoryProps, null> {
    renderBody(body) {
        const { filters, setFilter, defaultFilters, filtersData = {} } = this.props

        return body.map(({ type, label, name, placeholder, options }) => {
            return (
                <Filter
                    key={`${name}${label}${type}${placeholder}`}
                    filters={filters}
                    type={type}
                    setFilter={setFilter}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    options={options}
                    defaultFilters={defaultFilters}
                    filterData={filtersData[name]}
                />
            )
        })
    }
    render() {
        const { body = [] } = this.props
        return <div className={cx('filters')}>{this.renderBody(body)}</div>
    }
}

export { FiltersFactory }
